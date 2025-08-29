// api/subscribe.ts
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const rawKey = process.env.BUTTONDOWN_API_KEY;
  const key = rawKey ? rawKey.trim() : "";

  if (!key) {
    console.error("BUTTONDOWN_API_KEY missing. Add it to .env.local or Vercel env and restart `vercel dev`.");
    return res.status(500).json({ error: "Server not configured (missing API key)" });
  }
  
  // Masked visibility: e.g., bd_xxx… (length only)
  console.log(`Buttondown key loaded (len=${key.length}, prefix="${key.slice(0, 3)}***")`);

  const { email, source, company } = req.body || {};
  if (!email || typeof email !== "string") return res.status(400).json({ error: "Valid email required" });
  if (company) return res.status(200).json({ ok: true }); // honeypot
  
  try {
    const resp = await fetch("https://api.buttondown.com/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Token ${key}`, // must be exactly "Token <key>"
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        tags: [source || "lecture-series"],
      }),
    });

    const text = await resp.text();
    let payload: any = null;
    try { payload = text ? JSON.parse(text) : null; } catch {}

    const alreadySub =
      (payload?.detail && /already/i.test(payload.detail)) ||
      (Array.isArray(payload?.non_field_errors) && payload.non_field_errors.join(" ").match(/already/i));

    if (resp.ok || alreadySub) {
      return res.status(200).json({ ok: true, already: !!alreadySub });
    }

    // Surface Buttondown’s error to the client for debugging
    return res.status(400).json({
      error: payload?.detail || payload?.error || text || "Subscription failed",
      raw: payload ?? text,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || "Server error" });
  }
}

