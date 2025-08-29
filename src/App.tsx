import { useState, useEffect, Fragment } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Cpu, Cog, CircuitBoard, X } from "lucide-react";
import { BrowserRouter as Router, Routes, Route, NavLink, Link, useLocation } from "react-router-dom";
import {
  NAV,
  HERO,
  SUBTEAMS_CARDS,
  SUBTEAM_DETAILS,
  type SubteamKey,
  type Details,
  type DetailSection,
  INDUSTRY_PARTNERS,
} from "./data";
import {
  HOME_ABOUT,
  HOME_OFFERS,
  HOME_JOIN,
  HOME_COMPETITION,
  type OfferCard,
  type NavItem,
} from "./data";
import {
  LECTURE_UPCOMING,
  LECTURE_STATS,
  LECTURE_FEATURED,
  LECTURE_NEWS,
  type LectureEvent,
  type LectureStat,
  type FeaturedCompany,
  type LectureNewsItem,
  GROUPME_URL,
} from "./data";
import { PAST_SEASONS } from "./data";
// // 3D viewer deps (install: npm i three @react-three/fiber @react-three/drei)
// import { Canvas, useLoader, useThree } from "@react-three/fiber";
// import { Html, useProgress } from "@react-three/drei";
// // GLB loader
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
// import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
// import { Box3, Vector3 } from "three";

/**
 * App structure
 * - Full-bleed hero with BACKGROUND IMAGE (Figure-style)
 * - Light theme with black text, scarlet (#C8102E) & gray (#A7A8AA) accents
 * - Top-left pill nav (table of contents) routing to separate pages
 * - Subteams page shows a SINGLE expandable panel **below** the 3 cards.
 *   Clicking Learn More on any card populates that panel; switching cards swaps the content.
 * - Lecture Series: logo wall + animated stats + tabs (Upcoming | News) + signup + host CTA
 * - Air Brutus 1: STL viewer with clickable annotations
 *
 * NOTE: place your hero image at /public/hero.jpg (or update the src in data.ts)
 */
function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

function Layout() {
  const location = useLocation();
  const onHome = location.pathname === "/";
  return (
    <div className="min-h-screen bg-white text-black dark:bg-neutral-950 dark:text-neutral-100">
      {/* HEADER / TOC */}
      <Header overlay={onHome} />

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Top-level pages */}
        <Route path="/subteams" element={<Subteams />} />
        <Route path="/lecture-series" element={<LectureSeries />} />
        <Route path="/news" element={<NewsPage />} />
        {/* <Route path="/air-brutus-1" element={<AirBrutus />} /> */}
        <Route path="/past-seasons" element={<PastSeasons />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/get-involved" element={<GetInvolved />} />

        {/* Deep-link pages (optional to keep) */}
        <Route path="/subteams/structures" element={<StructuresPage />} />
        <Route path="/subteams/software" element={<SoftwarePage />} />
        <Route path="/subteams/avionics" element={<AvionicsPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

function Header({ overlay }: { overlay: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Consider past banner when scrolling beyond ~90% of viewport height (hero is ~92vh)
      setScrolled(window.scrollY > window.innerHeight * 0.9);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={[
        "z-50",
        overlay
          ? scrolled
            ? "fixed top-0 left-0 right-0 h-20 bg-white/90 backdrop-blur border-b border-black/10 dark:bg-neutral-950/80 dark:border-white/10"
    : "fixed top-4 left-0 right-4 h-40"
          : "sticky top-0 h-20 bg-white/90 backdrop-blur border-b border-black/10 dark:bg-neutral-950/80 dark:border-white/10",
      ].join(" ")}
    >
  <div className="mx-auto max-w-7xl flex items-center justify-between pl-0 pr-3 sm:pl-2 sm:pr-6 h-full">
        {/* Left: Logo + TOC */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center" aria-label="Buckeye Vertical Home">
            {/* Transparent logo (light/dark swap) */}
            {(() => {
              const size = overlay && !scrolled ? "h-40" : "h-20";
              const showWhiteInLight = overlay && !scrolled; // show white logo in light mode until navbar background appears
              return (
                <>
                  {/* Standard logo (light mode after scroll / non-overlay); always hidden in dark mode */}
                  <img
                    src="/logo.svg"
                    alt="Buckeye Vertical logo"
                    className={[size, "w-auto object-contain", showWhiteInLight ? "hidden" : "inline", "dark:hidden"].join(" ")}
                  />
                  {/* White logo (light mode before scroll on hero overlay); also used for dark mode at all times */}
                  <img
                    src="/logo_white.png"
                    alt="Buckeye Vertical logo"
                    className={[size, "w-auto object-contain", showWhiteInLight ? "inline" : "hidden", "dark:inline"].join(" ")}
                  />
                </>
              );
            })()}
            <span className="sr-only">Buckeye Vertical</span>
          </Link>
          <nav className="hidden md:flex flex-wrap gap-2 ml-2">
            {NAV.filter((i: NavItem) => i.to !== "/get-involved" && i.label.toLowerCase() !== "get involved").map((i: NavItem) => (
              <Pill key={i.to} to={i.to} label={i.label} />
            ))}
          </nav>
        </div>

        {/* Right: CTA */}
        <div className="flex items-center gap-3">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((s) => !s)}
            className="md:hidden inline-flex items-center justify-center rounded-md bg-white/95 dark:bg-neutral-900/70 border border-black/10 dark:border-white/10 p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            )}
          </button>
          <Link
            to="/get-involved"
            className="inline-flex items-center gap-2 rounded-xl bg-[#C8102E] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Get involved <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Mobile nav panel */}
      {mobileOpen && (
        <div className="md:hidden absolute inset-x-4 top-full mt-2 z-50">
          <div className="rounded-xl border border-black/10 bg-white dark:bg-neutral-950 p-4 shadow-lg">
            <nav className="flex flex-col gap-2">
              {NAV.filter((i: NavItem) => i.to !== "/get-involved" && i.label.toLowerCase() !== "get involved").map((i: NavItem) => (
                <NavLink
                  key={i.to}
                  to={i.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    [
                      "w-full text-left px-3 py-2 rounded-md border text-sm",
                      isActive
                        ? "bg-[#C8102E] text-white border-transparent"
                        : "bg-white/95 text-black border-black/10 hover:bg-white dark:bg-neutral-900/70 dark:text-white dark:border-white/10 dark:hover:bg-neutral-900",
                    ].join(" ")
                  }
                >
                  {i.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function Pill({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "px-3 py-1.5 rounded-md border text-sm transition shadow-sm",
          isActive
            ? "bg-[#C8102E] text-white border-transparent"
            : "bg-white/95 text-black border-black/10 hover:bg-white dark:bg-neutral-900/70 dark:text-white dark:border-white/10 dark:hover:bg-neutral-900",
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  );
}

/* ------------------------- HOME (image hero) -------------------------- */
function Home() {
  return (
    <main>
      {/* HERO with background image */}
      <section className="relative h-[92vh] min-h-[560px]">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO.image}
          alt="Buckeye Vertical drone in flight"
        />
  {/* Stronger gradient tint at the TOP for legibility */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />
  {/* Subtle bottom tint for grounding */}
  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 via-black/20 to-transparent" />

        {/* Bottom headline with motto */}
        <div className="relative z-10 h-full flex items-end">
          <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-8">
            <div className="flex items-start">
              <span className="mt-1 block h-12 sm:h-14 md:h-16 w-1.5 bg-[#C8102E] rounded-full" />
              <div className="overflow-hidden">
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.12 } } }}
                  className="ml-4"
                >
                  <motion.h1
                    className="text-5xl sm:text-6xl md:text-7xl font-semibold text-white"
                    variants={{ hidden: { x: -40, opacity: 0 }, show: { x: 0, opacity: 1 } }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  >
                    Buckeye Vertical
                  </motion.h1>
                  <motion.p
                    className="mt-3 text-white/90 text-xl sm:text-2xl md:text-3xl max-w-6xl"
                    variants={{ hidden: { x: -40, opacity: 0 }, show: { x: 0, opacity: 1 } }}
                    transition={{ type: "spring", stiffness: 120, damping: 22, delay: 0.05 }}
                  >
                    {HERO.tagline}
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT (team photo + blurb) */}
      <section id="about" className="border-t border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-black/10 bg-black/[0.02] dark:bg-white/[0.04]">
              <img src={HOME_ABOUT.teamImage} alt="Buckeye Vertical team" className="h-full w-full object-cover" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold">{HOME_ABOUT.heading}</h2>
              <p className="mt-4 text-black/70 dark:text-neutral-400 leading-relaxed">{HOME_ABOUT.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* OFFERS */}
      <section id="offers" className="border-t border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-semibold">What we offer</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {HOME_OFFERS.map((o: OfferCard) => (
              <div key={o.title} className="rounded-2xl border border-black/10 overflow-hidden bg-white dark:bg-neutral-900">
                <div className="relative aspect-[16/10] w-full bg-black/[0.02] dark:bg-white/[0.04]">
                  <img src={o.image} alt={o.alt} className="h-full w-full object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{o.title}</h3>
                  <p className="mt-2 text-sm text-black/70 dark:text-neutral-400">{o.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPETITION */}
      <section id="competition" className="border-t border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold">{HOME_COMPETITION.heading}</h2>
              <p className="mt-4 text-black/70 dark:text-neutral-400 leading-relaxed">{HOME_COMPETITION.body}</p>
            </div>
            <div className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-neutral-900">
              <h3 className="text-lg font-semibold">This year’s mission</h3>
              <ul className="mt-3 space-y-2 text-sm text-black/70 dark:text-neutral-400">
                {HOME_COMPETITION.bullets.map((b: string) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* JOIN CTA */}
      <section id="join-home" className="border-t border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white dark:bg-neutral-900">
            <div>
              <h3 className="text-2xl font-semibold">{HOME_JOIN.heading}</h3>
            </div>
            <div>
              <Link
                to={HOME_JOIN.to}
                className="inline-flex items-center gap-2 rounded-xl bg-[#C8102E] px-5 py-3 text-sm font-medium text-white hover:opacity-90"
              >
                {HOME_JOIN.ctaLabel} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ------------------------- PAGES -------------------------- */
function PageShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="bg-white dark:bg-neutral-950">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
  <h1 className="text-3xl font-semibold tracking-tight text-center sm:text-left">{title}</h1>
        <div className="mt-6">{children}</div>
      </section>
    </main>
  );
}

/* ------------------------- SUBTEAMS with shared details panel -------- */
function Subteams() {
  const [active, setActive] = useState<SubteamKey | null>(null);

  const ICONS: Record<string, ReactNode> = {
    cog: <Cog className="h-5 w-5" />,
    cpu: <Cpu className="h-5 w-5" />,
    circuit: <CircuitBoard className="h-5 w-5" />,
  };

  return (
    <PageShell title="Subteams">
      {/* Cards with inline details panel under the active card */}
      <div className="grid gap-6 md:grid-cols-3">
  {SUBTEAMS_CARDS.map((c: (typeof SUBTEAMS_CARDS)[number]) => (
          <Fragment key={c.id}>
            <SubteamCardSelectable
              title={c.title}
              subtitle={c.subtitle}
              body={c.body}
              image={c.image}
              icon={ICONS[c.icon]}
              active={active === c.id}
              onLearnMore={() => setActive(active === c.id ? null : c.id)}
            />

            {/* Insert the details panel immediately after the clicked card (span full grid) */}
            {active === c.id && (
              <div className="col-span-full md:hidden">
                <AnimatePresence initial={false} mode="wait">
                  <DetailsPanel
                    key={active}
                    title={c.title}
                    details={SUBTEAM_DETAILS[active]}
                    onClose={() => setActive(null)}
                  />
                </AnimatePresence>
              </div>
            )}
          </Fragment>
        ))}
      </div>

      {/* Desktop: shared details panel below all cards (hidden on mobile) */}
      <div className="hidden md:block mt-6">
        <AnimatePresence initial={false} mode="wait">
          {active && (
            <DetailsPanel
              key={active}
              title={SUBTEAMS_CARDS.find((c) => c.id === active)!.title}
              details={SUBTEAM_DETAILS[active]}
              onClose={() => setActive(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </PageShell>
  );
}

function SubteamCardSelectable({
  title,
  subtitle,
  body,
  image,
  icon,
  active,
  onLearnMore,
}: {
  title: string;
  subtitle: string;
  body: string;
  image?: string;
  icon: ReactNode;
  active: boolean;
  onLearnMore: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      className={
        "group rounded-2xl border transition overflow-hidden " +
        (active ? "border-[#C8102E] bg-white dark:bg-neutral-900" : "border-black/10 bg-white dark:bg-white/[0.04] hover:bg-black/[0.02] dark:hover:bg-white/[0.06]")
      }
    >
      <div className="relative aspect-[16/10] w-full bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900">
        {
          image ? (
            <img src={image} alt={subtitle} className="h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-black/60 dark:text-neutral-500 text-sm">
              {subtitle}
            </div>
          )
        }
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-black/80 dark:text-neutral-200">
          <span className="rounded-md bg-[#C8102E]/10 p-2 text-[#C8102E]">{icon}</span>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="mt-3 text-sm text-black/70 dark:text-neutral-400">{body}</p>
        <button
          onClick={onLearnMore}
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 px-4 py-2 text-sm font-medium text-black dark:text-white hover:bg-black/[0.03] dark:hover:bg-white/10"
        >
          {active ? "Hide Details" : "Learn More"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.article>
  );
}

function DetailsPanel({
  title,
  details,
  onClose,
}: {
  title: string;
  details: Details;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: 12, height: 0 }}
      transition={{ duration: 0.35 }}
      className="mt-8 overflow-hidden"
    >
      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-5 md:p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 px-3 py-1.5 text-sm hover:bg-black/[0.03]"
            aria-label="Close details"
          >
            <X className="h-4 w-4" /> Close
          </button>
        </div>

        <div className="mt-6 space-y-8">
          {details.sections.map((s: DetailSection, i: number) => (
            <DetailRow key={s.title} {...s} reverse={i % 2 === 1} />
          ))}

          {details.skills && details.skills.length > 0 && (
            <div className="rounded-2xl border border-black/10 p-5">
              <h4 className="text-base font-semibold">Skills you get to learn</h4>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-sm text-black/70 dark:text-neutral-400">
                {details.skills.map((sk: string) => (
                  <li key={sk}>• {sk}</li>
                ))}
              </ul>
            </div>
          )}

          {details.lead && (
            <div className="rounded-2xl border border-black/10 p-5">
              <h4 className="text-base font-semibold">Team Lead</h4>
              <p className="mt-2 text-sm text-black/80 dark:text-neutral-200">{details.lead.name}</p>
              <p className="text-sm text-black/60 dark:text-neutral-500">{details.lead.role}</p>
              <a href={`mailto:${details.lead.email}`} className="mt-2 inline-block text-sm text-[#C8102E] hover:opacity-90">
                {details.lead.email}
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------- Detail UI bits ---------------------------- */
function DetailRow({
  title,
  bullets,
  image,
  alt,
  embedUrl,
  reverse,
}: DetailSection & { reverse?: boolean }) {
  return (
    <div className={"grid items-center gap-4 md:gap-6 " + (reverse ? "md:grid-cols-[2fr_3fr]" : "md:grid-cols-[3fr_2fr]") }>
      {/* Image */}
      {reverse ? (
        <div className="order-2 md:order-1">
          <div className="aspect-[16/10] w-full overflow-hidden rounded-xl border border-black/10 bg-black/[0.02] dark:bg-white/[0.04]">
            {embedUrl ? (
              <iframe
                className="h-full w-full"
                src={embedUrl}
                title={alt}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <img src={image} alt={alt} className="h-full w-full object-cover" />
            )}
          </div>
        </div>
      ) : null}

      {/* Text */}
      <div className={reverse ? "order-1 md:order-2" : ""}>
        <h4 className="text-base font-semibold">{title}</h4>
        <ul className="mt-3 space-y-2 text-sm text-black/70 dark:text-neutral-400">
          {bullets.map((b) => (
            <li key={b}>• {b}</li>
          ))}
        </ul>
      </div>

      {/* Image when not reversed */}
      {!reverse ? (
        <div className="order-2">
          <div className="aspect-[16/10] w-full overflow-hidden rounded-xl border border-black/10 bg-black/[0.02] dark:bg-white/[0.04]">
            {embedUrl ? (
              <iframe
                className="h-full w-full"
                src={embedUrl}
                title={alt}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <img src={image} alt={alt} className="h-full w-full object-cover" />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-gradient-to-b from-black/[0.02] to-white dark:from-white/[0.04] dark:to-neutral-900 p-6 text-center">
      <div className="text-4xl font-semibold tracking-tight">
        <CountUp value={value} />
      </div>
      <div className="mt-1 text-sm text-black/70 dark:text-neutral-400">{label}</div>
    </div>
  );
}

function CountUp({ value, duration = 900 }: { value: string | number; duration?: number }) {
  const [display, setDisplay] = useState<string>(String(value));
  useEffect(() => {
    const raw = String(value);
    const num = Number(raw.replace(/[^0-9.]/g, ""));
    const suffix = raw.replace(/[0-9., ]/g, "");
    if (!isFinite(num)) {
      setDisplay(raw);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const cur = Math.round(num * p);
      setDisplay(cur.toLocaleString() + suffix);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return <span>{display}</span>;
}

/* ------------------------- Lecture Series (grand + tabs) ------------- */
function LectureSeries() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "lecture-series" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok && !data?.already) {
        throw new Error(data?.error || `HTTP ${res.status}`);
      }
      setSubmitted(true);
    } catch (err) {
      console.error("Subscription error:", err);
      setSubmitted(true); // keep friction low; optionally show a toast with err.message
    }
  };


  return (
    <PageShell title="Lecture Series">
      {/* Featured companies — logo wall */}
      <section>
        <div className="text-center">
          <h2 className="text-xl font-semibold">Companies we've hosted</h2>
        </div>
        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {LECTURE_FEATURED.map((c: FeaturedCompany) => (
              c.url ? (
                <a key={c.name} href={c.url} className="flex items-center justify-center" aria-label={c.name}>
                  <div className="w-full h-20 flex items-center justify-center rounded-lg bg-neutral-50 border border-black/10 p-4 shadow-sm">
                    <img src={c.logo} alt={c.name} className="max-h-14 w-auto object-contain" />
                  </div>
                </a>
              ) : (
                <div key={c.name} className="flex items-center justify-center">
                  <div className="w-full h-20 flex items-center justify-center rounded-lg bg-neutral-50 border border-black/10 p-4 shadow-sm">
                    <img src={c.logo} alt={c.name} className="max-h-14 w-auto object-contain" />
                  </div>
                </div>
              )
            ))}
          </div>
          
        </div>
      </section>

      {/* Stats — big and animated */}
      <section className="mt-10">
        <div className="grid gap-4 sm:grid-cols-3">
          {LECTURE_STATS.map((s: LectureStat) => (
            <StatTile key={s.label} label={s.label} value={s.value} />
          ))}
        </div>
      </section>

      {/* Upcoming talks (standalone — News is its own top-level page) */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold">Upcoming</h2>
        {LECTURE_UPCOMING.length === 0 ? (
          <p className="mt-4 text-black/70 dark:text-neutral-400">More talks announced soon.</p>
        ) : (
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            {LECTURE_UPCOMING.map((ev: LectureEvent) => (
              <article key={ev.title + ev.date} className="rounded-2xl border border-black/10 overflow-hidden bg-white dark:bg-neutral-900">
                <div className="relative aspect-[16/9] w-full bg-black/[0.02] dark:bg-white/[0.04]">
                  {ev.image ? (
                    <img src={ev.image} alt={ev.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-black/40 text-sm">Event image</div>
                  )}
                </div>
                <div className="p-5">
                  <div className="text-sm text-black/60 dark:text-neutral-500">{ev.org}</div>
                  <h3 className="mt-1 text-lg font-semibold">{ev.title}</h3>
                  {ev.speaker && <p className="text-sm text-black/70 dark:text-neutral-400">Speaker: {ev.speaker}</p>}
                  <div className="mt-2 text-sm text-black/70 dark:text-neutral-400">
                    <span>{ev.date}</span>
                    {ev.time && <span> • {ev.time}</span>}
                    {ev.location && <span> • {ev.location}</span>}
                  </div>
                  {ev.blurb && <p className="mt-2 text-sm text-black/70 dark:text-neutral-400">{ev.blurb}</p>}
                  {ev.rsvp && (
                    <a href={ev.rsvp} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#C8102E] px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                      RSVP <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Notifications signup */}
      <section className="mt-10">
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-5 md:p-6">
          <h3 className="text-lg font-semibold">Get notified about upcoming lectures</h3>
          {submitted ? (
            <p className="mt-3 text-sm text-black/70 dark:text-neutral-400">Thanks! You’re on the list.</p>
          ) : (
            <form onSubmit={submit} className="mt-4 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@osu.edu"
                className="flex-1 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#C8102E]"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                Notify Me <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
          <p className="mt-2 text-xs text-black/50 dark:text-white">We’ll only use your email to send lecture announcements.</p>
        </div>
      </section>

      {/* Host a lecture */}
      <section className="mt-10">
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-gradient-to-r from-[#C8102E]/10 to-black/[0.02] dark:from-[#C8102E]/15 dark:to-white/[0.04] p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold">Want to host a Lecture Series?</h3>
              <p className="mt-2 text-sm text-black/70 dark:text-neutral-400 max-w-2xl">We welcome industry speakers from aerospace, robotics, and AI. Share tech deep dives, career paths, and real-world lessons with our members.</p>
            </div>
            <div className="flex gap-3">
              <a href="mailto:buckeyevertical@buckeyemail.osu.edu?subject=Lecture%20Host%20Inquiry" className="inline-flex items-center gap-2 rounded-xl bg-[#C8102E] px-5 py-2 text-sm font-medium text-white hover:opacity-90">Become a Host <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

/* ------------------------- News page (optional route) ---------------- */
function NewsPage() {
  return (
    <PageShell title="News">
      <div className="grid gap-6 md:grid-cols-2">
        {LECTURE_NEWS.map((n: LectureNewsItem) => (
          <article key={n.month + n.title} className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 overflow-hidden">
            {n.image && (
              <div className="relative aspect-[16/9] w-full bg-black/[0.02] dark:bg-white/[0.04]">
                <img src={n.image} alt={n.title} className="h-full w-full object-cover" />
              </div>
            )}
            <div className="p-5">
              <div className="text-xs uppercase tracking-wide text-black/50">{n.month}</div>
              <h3 className="mt-1 text-lg font-semibold">{n.title}</h3>
              <p className="mt-2 text-sm text-black/70 dark:text-neutral-400">{n.body}</p>
              {n.link && (
                <a href={n.link} className="mt-3 inline-flex items-center gap-2 text-sm text-[#C8102E]">
                  Read more <ArrowRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

// /* ------------------------- Air Brutus 1 (GLB + annotations) ---------- */
// function AirBrutus() {
//   const [focusIndex, setFocusIndex] = useState<number | null>(null);

//   return (
//     <PageShell title="Air Brutus 1">
//       <div className="rounded-2xl border border-black/10 overflow-hidden">
//         <div className="relative aspect-[16/9] w-full bg-black/[0.02] dark:bg-white/[0.04]">
//           <Suspense fallback={<CenterNote>Loading 3D model…</CenterNote>}>
//             <Canvas camera={{ position: [0, 0.5, 3.5], fov: 55 }}>
//               <LoaderOverlay />
//               <ambientLight intensity={0.7} />
//               <directionalLight position={[4, 4, 4]} intensity={0.7} />

//               {/* Scene content lives inside Canvas so R3F hooks are valid */}
//               <AirBrutusScene focusIndex={focusIndex} onFocus={setFocusIndex} />
//             </Canvas>
//           </Suspense>
//           {focusIndex !== null && (
//             <button
//               onClick={() => setFocusIndex(null)}
//               className="absolute top-3 right-3 rounded-md bg-white/90 dark:bg-neutral-900/80 border border-black/10 dark:border-white/10 px-3 py-1.5 text-xs"
//             >
//               Reset view
//             </button>
//           )}
//         </div>
//       </div>
//       <p className="mt-4 text-sm text-black/60 dark:text-neutral-500">Click a dot to focus on a component and see its description.</p>
//     </PageShell>
//   );
// }

// function AirBrutusScene({ focusIndex, onFocus }: { focusIndex: number | null; onFocus: (i: number) => void }) {
//   const modelUrl = import.meta.env.VITE_MODEL_URL ?? "/air-brutus-1.glb";
//   const gl = useThree((s) => s.gl);
//   const gltf = useLoader(GLTFLoader, modelUrl, (ldr) => {
//     const draco = new DRACOLoader();
//     draco.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
//     (ldr as GLTFLoader).setDRACOLoader(draco);

//     const ktx2 = new KTX2Loader();
//     ktx2.setTranscoderPath("https://www.gstatic.com/basis-universal/1.0.0/");
//     try { (ktx2 as any).detectSupport?.(gl); } catch {}
//     (ldr as any).setKTX2Loader?.(ktx2);

//     (ldr as any).setMeshoptDecoder?.(MeshoptDecoder as any);
    
//   }) as GLTF;

//   // Normalize scene: center and scale so camera/annotations align
//   const norm = useMemo(() => {
//     const scene = gltf.scene.clone(true);
//     const box = new Box3().setFromObject(scene);
//     const c = box.getCenter(new Vector3());
//     const size = box.getSize(new Vector3());
//     const r = Math.max(size.x, size.y, size.z) * 0.5 || 1;
//     const scale = 1.2 / r;
//     scene.position.sub(c);
//     scene.scale.setScalar(scale);
//     const transform = (p: [number, number, number]) => (
//       [(p[0] - c.x) * scale, (p[1] - c.y) * scale, (p[2] - c.z) * scale] as [number, number, number]
//     );
//     return { scene, transform };
//   }, [gltf]);


//   const defaultView = useMemo(
//     () => ({ pos: [0, 0.5, 3.5] as [number, number, number], target: [0, 0, 0] as [number, number, number] }),
//     []
//   );


//   return (
//     <>
//       {/* Normalized GLB scene */}
//       <primitive object={norm.scene} />

//       {/* Annotations in normalized space */}
//       {tAnn.map((a, idx) => (
//         <AnnotationDot
//           key={a.label + idx}
//           annotation={{ label: a.label, description: a.description, position: a.tpos as [number, number, number] }}
//           onFocus={() => onFocus(idx)}
//         />
//       ))}

//       {/* Camera controller */}
//       <CameraRig view={focusIndex === null ? defaultView : focusStops[focusIndex]} />
//     </>
//   );
// }

// // CameraRig and AnnotationDot removed — AirBrutus page uses OrbitControls only.

// function CenterNote({ children }: { children: ReactNode }) {
//   return (
//     <div className="absolute inset-0 grid place-items-center text-sm text-black/60 dark:text-neutral-500">{children}</div>
//   );
// }

// function LoaderOverlay() {
//   const { active, progress, item, errors } = useProgress();
//   if (!active && (!errors || errors.length === 0)) return null;
//   return (
//     <Html center>
//       <div className="rounded-lg bg-white/90 dark:bg-neutral-900/90 px-3 py-2 text-xs text-black dark:text-white shadow">
//         {active ? `Loading… ${Math.round(progress)}%` : "Failed to load model (check VITE_MODEL_URL or /air-brutus-1.glb)"}
//         {item ? <div className="mt-1 opacity-70">{item}</div> : null}
//       </div>
//     </Html>
//   );
// }

// AnnotationDot removed.

/* ------------------------- Other pages (stubs) ----------------------- */
function StructuresPage() {
  return (
    <PageShell title="Structures">
      <HeroImagePlaceholder label="CAD of Air Brutus 1" />
      <p className="mt-6 text-black/70 dark:text-neutral-400 max-w-3xl">
        We design high‑performance airframes with CAD/CAM workflows, FEA, and rapid iteration—from concept to flight‑ready assemblies.
      </p>
    </PageShell>
  );
}

export default App;
function SoftwarePage() {
  return (
    <PageShell title="Software">
      <HeroImagePlaceholder label="Object Detection Model" />
      <p className="mt-6 text-black/70 dark:text-neutral-400 max-w-3xl">
        We develop robust AI, computer vision, and autonomy stacks—perception, planning, and control across advanced sensors.
      </p>
    </PageShell>
  );
}
function AvionicsPage() {
  return (
    <PageShell title="Avionics">
      <HeroImagePlaceholder label="Soldering Avionics System" />
      <p className="mt-6 text-black/70 dark:text-neutral-400 max-w-3xl">
        We integrate electronics: GPS, telemetry, power, propulsion, and reliable flight‑controller configurations.
      </p>
    </PageShell>
  );
}


function PastSeasons() {
  return (
    <PageShell title="Past Seasons">
      <div className="space-y-10">
        {PAST_SEASONS.map((s) => (
          <section key={s.year} className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-5 md:p-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-semibold">{s.year}</h2>
              <img src={s.logoImage} alt={`${s.year} competition logo`} className="h-10 w-auto opacity-80" />
            </div>
            <div className="mt-4 grid gap-6 md:grid-cols-2 items-start">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-black/10 bg-black/[0.02] dark:bg-white/[0.04]">
                <img src={s.teamImage} alt={`${s.year} team`} className="h-full w-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Season overview</h3>
                <p className="mt-2 text-sm text-black/70 dark:text-neutral-400 leading-relaxed">{s.overview}</p>
                {s.accomplishments?.length ? (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold">Accomplishments</h4>
                    <ul className="mt-2 space-y-1 text-sm text-black/80 dark:text-neutral-200">
                      {s.accomplishments.map((a) => (
                        <li key={a}>• {a}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}

function Partners() {
  return (
    <PageShell title="Industry Partners">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold">Our Industry Partners</h2>
        <p className="mt-3 text-sm text-black/70 dark:text-neutral-400 max-w-3xl mx-auto">We collaborate with companies and labs across aerospace, robotics, and AI.</p>
      </div>

      <div className="mt-8 flex justify-center">
        <div className="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center">
          {INDUSTRY_PARTNERS.map((c: FeaturedCompany) => (
            c.url ? (
              <a key={c.name} href={c.url} className="flex items-center justify-center" aria-label={c.name}>
                <div className="w-full h-20 flex items-center justify-center rounded-lg bg-neutral-50 border border-black/10 p-4 shadow-sm">
                  <img src={c.logo} alt={c.name} className="max-h-14 w-auto object-contain" />
                </div>
              </a>
            ) : (
              <div key={c.name} className="flex items-center justify-center">
                <div className="w-full h-20 flex items-center justify-center rounded-lg bg-neutral-50 border border-black/10 p-4 shadow-sm">
                  <img src={c.logo} alt={c.name} className="max-h-14 w-auto object-contain" />
                </div>
              </div>
            )
          ))}
        </div>
      </div>

  {/* Sponsors row removed per request - logos hidden */}

      <div className="mt-12 flex justify-center">
        <a
          href="mailto:buckeyevertical@buckeyemail.osu.edu?subject=Sponsor%20Inquiry"
          className="inline-flex items-center gap-2 rounded-xl bg-[#C8102E] px-6 py-3 text-sm font-medium text-white hover:opacity-90"
        >
          We're looking for sponsors
        </a>
      </div>
    </PageShell>
  );
}

function GetInvolved() {
  return (
    <PageShell title="Get Involved">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left: Meeting Times + Contact */}
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-6">
          <h2 className="text-xl font-semibold">Meeting Times</h2>
          <div className="mt-4 space-y-4 text-sm text-black/80 dark:text-neutral-200">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-medium">Tuesday</div>
                <div className="text-black/70 dark:text-neutral-300">Avionics</div>
              </div>
              <div className="font-medium">6PM–8PM</div>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <div className="font-medium">Wednesday</div>
                <div className="text-black/70 dark:text-neutral-300">Full Team</div>
              </div>
              <div className="font-medium">6PM–8PM</div>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <div className="text-black/80 dark:text-neutral-200 font-medium">Thursday</div>
                <div className="text-black/70 dark:text-neutral-300">Structures</div>
              </div> 
              <div className="font-medium">6PM–8PM</div>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <div className="font-medium">Software</div>
                <div className="text-black/70 dark:text-neutral-300">TBD</div>
              </div>
              <div className="font-medium text-black/50 dark:text-neutral-500">TBD</div>
            </div>
          </div>

          <div className="mt-6 border-t border-black/5 pt-4 text-sm text-black/70 dark:text-neutral-400">
            <div className="font-medium">Contact</div>
            <p className="mt-2 text-sm text-black/70 dark:text-neutral-400">For questions or to get involved, email us at:</p>
            <div className="mt-2">
              <a href="mailto:buckeyevertical@buckeyemail.osu.edu" className="text-[#C8102E] hover:underline">buckeyevertical@buckeyemail.osu.edu</a>
            </div>
          </div>

          <div className="mt-6">
            <a
              href={GROUPME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#C8102E] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Join our GroupMe
            </a>
          </div>
        </div>

        {/* Right: Location + Map */}
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-6">
          <h2 className="text-xl font-semibold">Meeting Location</h2>
          <div className="mt-4 text-sm text-black/80 dark:text-neutral-200">
            <div className="font-medium">Scott Laboratory W092</div>
            <div>201 W 19th Ave,</div>
            <div>Columbus, OH 43210</div>
          </div>

          <div className="mt-4">
            <div className="overflow-hidden rounded-lg border border-black/10">
              <iframe
                title="Scott Laboratory map"
                src="https://www.google.com/maps?q=Scott+Laboratory+W092+201+W+19th+Ave+Columbus+OH+43210&output=embed"
                className="w-full h-56 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}


function HeroImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-black/10 bg-black/[0.02] dark:bg-white/[0.04]">
      <div className="absolute inset-0 flex items-center justify-center text-black/60 dark:text-neutral-500 text-sm">
        {label}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-black/10 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-black/60 dark:text-neutral-500 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Buckeye Vertical · Ohio State University</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-black">GitHub</a>
          <a href="#" className="hover:text-black">Instagram</a>
          <a href="#" className="hover:text-black">Email</a>
        </div>
      </div>
    </footer>
  );
}
