// Centralized site content/config for easy editing.
// Import from App:  import { NAV, HERO, SUBTEAMS_CARDS, SUBTEAM_DETAILS, type SubteamKey } from "./data";

export type SubteamKey = "structures" | "software" | "avionics";

export type NavItem = { label: string; to: string };
export type Hero = {
  image: string;
  headline: string;
  tagline: string;
  primaryCta: { label: string; to: string };
};

// ---- Home sections ----
export type HomeAbout = {
  teamImage: string;
  heading: string;
  body: string;
};

export type OfferCard = {
  title: string;
  body: string;
  image: string;
  alt: string;
};

export const HOME_ABOUT: HomeAbout = {
  teamImage: "/team.jpg",
  heading: "We Are Buckeye Vertical",
  body:
    "Buckeye Vertical is Ohio State University’s drone competition team. We are committed to providing a comprehensive platform for members to acquire knowledge and skills in Unmanned Aerial Systems while developing cutting-edge technologies in aerospace, robotics, and computer science.",
};

export const HOME_OFFERS: OfferCard[] = [
  {
    title: "Engineering Experience",
    body:
      "Across our sub teams, invaluable expertise is readily accessible at every stage of development, spanning software engineering, structural design, and electrical systems. This ensures a robust support network, fostering comprehensive project growth and innovation.",
    image: "/offer-engineering.jpg",
    alt: "Members collaborating on engineering tasks",
  },
  {
    title: "Professional Development",
    body:
      "By engaging with industry mentors and companies, members can showcase contributions, receive referrals to top firms, and strengthen networking skills during lecture series events—opening doors to prestigious career opportunities.",
    image: "/offer-professional.jpg",
    alt: "Industry mentor speaking with students",
  },
  {
    title: "Social Events",
    body:
      "Throughout the year, social events like bowling and Topgolf help build stronger relationships among team members and mentors, strengthening bonds and team cohesion.",
    image: "/offer-social.jpg",
    alt: "Students at a social team event",
  },
];

export const HOME_JOIN = {
  heading: "Interested in joining?",
  ctaLabel: "Get Involved",
  to: "/get-involved",
} as const;

export type DetailSection = { title: string; bullets: string[]; image: string; alt: string; embedUrl?: string };
export type Details = {
  sections: DetailSection[];
  skills?: string[];
  lead?: { name: string; role: string; email: string };
};

// --- Global nav (Table of Contents) ---
export const NAV: NavItem[] = [
    { label: "Subteams", to: "/subteams" },
    { label: "Lecture Series", to: "/lecture-series" },
    { label: "Past Seasons", to: "/past-seasons" },
    { label: "Industry Partners", to: "/partners" },
    { label: "Get Involved", to: "/get-involved" },
    // { label: "News", to: "/news" },
    // { label: "Air Brutus 1", to: "/air-brutus-1" },
];

// --- Home hero ---
export const HERO: Hero = {
  image: "/hero.jpg",
  headline: "Buckeye Vertical is OSU's premier aerial robotics competition team",
  tagline: "Soaring Beyond Boundaries. Engineering Tomorrow’s Skies.",
  primaryCta: { label: "Join Us", to: "/get-involved" },
};

// --- Subteam cards (brief) ---
export const SUBTEAMS_CARDS: Array<{
  id: SubteamKey;
  title: string;
  subtitle: string;
  image: string;
  body: string;
  icon: "cog" | "cpu" | "circuit";
}> = [
  {
    id: "structures",
    title: "Structures",
    subtitle: "CAD of Air Brutus 1",
    image: "/cad.jpg",
    body:
      "Designing, manufacturing, and assembling autonomous vehicle using CAD/CAM/Simulation and advanced manufacturing techniques",
    icon: "cog",
  },
  {
    id: "software",
    title: "Software",
    subtitle: "Object Detection Model",
    image: "/obj-det.jpg",
    body:
      "Developing robust AI, computer vision, and autonomous navigation algorithms using advanced sensor technologies.",
    icon: "cpu",
  },
  {
    id: "avionics",
    title: "Avionics",
    subtitle: "Soldering Avionics System",
    image: "/soldering.jpg",
    body:
      "Concentrate on configuring electronic systems(GPS, telemetry, power distribution, propulsion, etc) on autonomous vehicle.",
    icon: "circuit",
  },
];

// --- Full details for each subteam ---
export const SUBTEAM_DETAILS: Record<SubteamKey, Details> = {
  structures: {
    sections: [
      {
        title: "Design aircraft for annual competition",
        bullets: [
          "Utilize SolidWorks to design vehicle prior to manufacturing",
          "Leverage Ansys for vibration and structural optimization analysis",
          "Bulk of work takes place from September–November",
          "Small tasks persist throughout the season",
        ],
        image: "/structures-design.jpg",
        alt: "CAD and FEA of competition aircraft",
      },
      {
        title: "Manufacture & Assemble Unmanned Aerial Vehicle",
        bullets: [
          "Visualize hard work team puts in throughout the 1st semester",
          "Leverage technologies including CNCs, 3D printing, laser cutting, water jetting, lathes, mills",
          "Great opportunity for everyone regardless of skillset to get involved quickly!",
          "Takes place from November–January with small tasks throughout the year",
        ],
        image: "/structures-build.jpg",
        alt: "Members fabricating and assembling airframe",
      },
      {
        title: "Experiment & implement payload drop mechanisms",
        bullets: [
          "Leverage technologies including CNCs, 3D printing, laser cutting, water jetting, lathes, mills",
          "Great spot for new students to jump in and pitch their idea",
        ],
        image: "/structures-payload.jpg",
        alt: "Payload drop mechanism prototype",
      },
    ],
    skills: [
      "General CAD skills & practices",
      "Conducting FEA analysis",
      "Aircraft Design",
      "Modern Manufacturing Techniques",
      "Emphasis on Engineering Design Process",
      "Industry Style Team Dynamics",
    ],
    lead: {
      name: "Vignesh Ganji",
      role: "Senior in Mechanical Engineering",
      email: "ganji.5@buckeyemail.osu.edu",
    },
  },

  software: {
    sections: [
      {
        title: "Object Detection",
        bullets: [
          "Build image processing + AI to detect vision targets from >90 ft AGL",
          "Develop localization to estimate precise latitude/longitude of targets",
          "Generate a synthetic dataset (12k+ variants) via domain randomization",
        ],
        image: "/software-obj-det.jpg",
        alt: "Object detection and target localization",
      },
      {
        title: "Object Avoidance & Path Planning",
        bullets: [
          "Navigation and automation in dynamic airspace",
          "Process LiDAR and Time‑of‑Flight data for obstacle avoidance and payload operations",
          "Airspace awareness and safe routing",
        ],
  image: "/software-avoidance.jpg",
  embedUrl: "https://www.youtube.com/embed/_pt2vKJa-Ro?si=UMZIuJjTZh_upX27",
        alt: "Path planning and obstacle avoidance",
      },
      { 
        title: "Mapping",
        bullets: [
          "Developing algorithms to stitch a high-fidelity map of the ground based on images taken from high-resolution camera",
          "Engineering protocols to remotely transfer the map from the flight to the ground station",
        ],
        image: "/software-mapping.jpg",
        alt: "Mapping",
      },
      {
        title: "Flight Software",
        bullets: [
          "Compose algorithms into a cohesive autonomous mission stack",
          "Unit and integration tests in simulation to ensure reliability",
          "Continuous improvement with data and flight logs",
        ],
        image: "/software-integration.jpg",
        alt: "Mission stack integration and testing",
      },
    ],
    skills: [
      "General software development practices",
      "AI & Machine Learning",
      "Python, C++, ROS development",
      "NVIDIA Jetson software suite",
      "Algorithm design & implementation",
      "Linux tooling",
      "Test development for reliability",
      "Industry‑style team workflows",
    ],
    lead: {
      name: "Eashan Vytla",
      role: "Junior in Computer Science Engineering",
      email: "vytla.4@buckeyemail.osu.edu",
    },
  },

  avionics: {
    sections: [
      {
        title: "Design Electronic Subsystems",
        bullets: [
          "Create network diagrams for all telemetry and communication protocols",
          "Determine power requirements to meet competition guidelines",
          "Build a robust Ethernet data pipeline between Jetson Orin, camera gimbal, LiDAR, and other sensors",
        ],
        image: "/avionics-bench.jpg",
        alt: "Telemetry, power, and comms network on bench",
      },
      {
        title: "Determine UAS Propulsion Systems",
        bullets: [
          "Apply blade element momentum (BEM) theory to select optimal propulsion",
          "Use requirements to configure efficient, powerful motor + propeller combinations",
        ],
        image: "/avionics-integration.jpg",
        alt: "Propulsion components and integration",
      },
      {
        title: "Implement & Tune Flight Control Software",
        bullets: [
          "Modify flight‑controller software to ensure correct system behavior",
          "Analyze vibration data and provide feedback to Structures",
          "Fine‑tune PID controllers from rigorous flight‑test analysis",
        ],
        image: "/avionics-testing.jpg",
        alt: "Flight testing and tuning",
      },
    ],
    skills: [
      "PID control",
      "Electrical systems configuration",
      "Flight‑controller tuning",
      "Soldering",
      "Vehicle flight‑parameter calculation",
    ],
    lead: {
      name: "Garva Patel",
      role: "Senior in Mechanical Engineering",
      email: "patel.4739@buckeyemail.osu.edu",
    },
  },
};

// ---- Lecture Series ----
export type LectureEvent = {
  title: string;
  org: string;
  date: string;         // e.g., "Sep 21, 2025"
  time?: string;        // e.g., "6:00–7:00 PM"
  location?: string;    // e.g., "Dreese 260"
  speaker?: string;
  blurb?: string;
  image?: string;       // /public/… path
  rsvp?: string;        // external RSVP link
};

export type LectureStat = { label: string; value: string };
export type FeaturedCompany = { name: string; logo: string; url?: string };

// Fill this with your real upcoming talks (leave empty to show “More talks soon”)
export const LECTURE_UPCOMING: LectureEvent[] = [
  // Example:
  // {
  //   title: "Autonomy at Scale",
  //   org: "Amazon Robotics",
  //   speaker: "Dr. Jane Doe",
  //   date: "Oct 3, 2025",
  //   time: "6:00–7:00 PM",
  //   location: "Hitchcock Hall 131",
  //   blurb: "Lessons from large-scale robot fleets.",
  //   image: "/lecture-amazon.jpg",
  //   rsvp: "https://…",
  // },
];

export const LECTURE_STATS: LectureStat[] = [
  { label: "Total sessions", value: "28+" },
  { label: "Companies hosted", value: "14" },
  { label: "Avg. attendance", value: "80+" },
];

export const LECTURE_FEATURED: FeaturedCompany[] = [
  { name: "Amazon", logo: "/logos/amazon.svg", url: "https://www.amazon.science/" },
  { name: "Johns Hopkins APL", logo: "/logos/jhu-apl.svg", url: "https://www.jhuapl.edu/" },
  { name: "GE Aerospace", logo: "/logos/ge-aerospace.svg", url: "https://www.geaerospace.com/" },
];

// Additional industry sponsors / partners (use this list for a larger logo wall)
export const INDUSTRY_PARTNERS: FeaturedCompany[] = [
  // Add more partner entries here. Example format:
  { name: "Amazon", logo: "/logos/amazon.svg", url: "https://www.amazon.science/" },
  { name: "Johns Hopkins APL", logo: "/logos/jhu-apl.svg", url: "https://www.jhuapl.edu/" },
  { name: "GE Aerospace", logo: "/logos/ge-aerospace.svg", url: "https://www.geaerospace.com/" },
  { name: "Avari Aerospace", logo: "/logos/avari.png", url: "https://www.avariaero.com/" },
  { name: "Parawave", logo: "/logos/parawave.png", url: "https://parawave.us/" },
  { name: "Boeing", logo: "/logos/boeing.svg", url: "https://www.boeing.com/" },
  { name: "Honda", logo: "/logos/honda.svg", url: "https://www.honda.com/" },
];

// ---- Home: About the competition ----
export const HOME_COMPETITION = {
  heading: "About our Competition",
  body:
    "For the 2024–2025 season, Buckeye Vertical is competing for the 3rd time in the Student Unmanned Aerial Systems competition hosted by RoboNation. This competition takes place in St. Mary’s Airport in California, Maryland and tests collegiate and high school students skills within robotics, aircraft development, and mechanical design.",
  bullets: [
    "Drone’s are required to fly 4 laps of ~3 miles each",
    "At the end of each lap, drone’s must deliver a payload from 50 ft+ to regions marked with objects (e.g., basketball, tennis racket, bicycle, etc.)",
    "The drone must deliver a map of a specified boundary location",
    "These tasks must be completed within 30 minutes and fully autonomous",
  ],
} as const;

// ---- Lecture Series: News (monthly) ----
export type LectureNewsItem = {
  month: string;       // "Sep 2025"
  title: string;
  body: string;
  image?: string;
  link?: string;
};

export const LECTURE_NEWS: LectureNewsItem[] = [
  // Examples — replace with your updates
  // {
  //   month: "Sep 2025",
  //   title: "Kickoff & Amazon Robotics talk announced",
  //   body: "We’re opening the semester with an autonomy-at-scale deep dive from Amazon Robotics.",
  //   image: "/news-sep.jpg",
  //   link: "https://…",
  // },
];

// ---- Air Brutus 1: annotations for clickable dots ----
export type Annotation = {
  label: string;
  description: string;
  position: [number, number, number]; // in model units
};

export const AIR_BRUTUS_ANNOTATIONS: Annotation[] = [
  // Example dots — tweak positions after you confirm the STL’s scale/axis
  { label: "Camera Gimbal", description: "Stabilized payload gimbal for vision tasks.", position: [0.15, 0.05, 0.2] },
  { label: "LiDAR", description: "3D ranging sensor used for obstacle avoidance.", position: [-0.1, 0.12, 0.05] },
  { label: "GPS Mast", description: "High-precision GNSS for localization.", position: [0, 0.25, -0.1] },
];

// ---- Past Seasons ----
export type PastSeason = {
  year: string;
  teamImage: string; // /public path
  logoImage: string; // /public path
  overview: string;
  accomplishments: string[];
};

export const PAST_SEASONS: PastSeason[] = [
  {
    year: "2023–2024",
    teamImage: "/seasons/2023-2024-team.jpg",
  logoImage: "/logos/suas.png",
    overview:
      "Building on the knowledge and skills developed from the previous year, the team once again competed in the Student Unmanned Aerial Systems Competition (SUAS). This year, Buckeye Vertical successfully completed the mission at the international competition in California, MD and placed 4th in the mission demonstration. Attending the competition for the first gave the team an opportunity to connect with all the other universities, allowing for very crucial knowledge to be shared amongst each other. The team is very excited to apply this knowledge, with their eyes set on gold for next season.",
    accomplishments: ["🏆 4th place in Mission Demonstration"],
  },
  {
    year: "2022-2023",
    teamImage: "/seasons/2022-2023-team.jpg",
  logoImage: "/logos/suas.png",
    overview:
      "Coming off a winning season, the team decided to look into a more multi-disciplinary competition that would allow for the club to continue to grow. This competition was the Student Unmanned Aerial Systems Competition (SUAS). This first season served as a stepping stone, with a focus on establishing team setup and workflow for this new challenge. The team learned a tremendous amount during this season in regards to drone design and flight stability. Although Buckeye Vertical did not make it to competition, the Flight Readiness Review helped the team place 36th out of 78 schools internationally.",
    accomplishments: [
      "Successfully transitioned from VFS Design-Build-Vertical Flight Challenge to SUAS Competition",
    ],
  },
  {
    year: "2021-2022",
    teamImage: "/seasons/2021-2022-team.jpg",
    logoImage: "/logos/vfs.png",
    overview:
      "Building on last season's success, our members were prepared to compete at the highest level with their gained experience. Switching from a hybrid eVTOL to a hexacopter design, the new drone secured first place overall in the Vertical Flight Society’s Design-Build-Vertical Flight Student Competition.",
    accomplishments: ["🏆 1st Place in VFS Challenge"],
  },
  {
    year: "2020-2021",
    teamImage: "/seasons/2020-2021-team.jpg",
    logoImage: "/logos/vfs.png",
    overview:
      "Buckeye Vertical was founded in 2020, marking the beginning of our journey. Despite the challenges COVID presented during the 2020–2021 academic year, our members achieved remarkable success in the Vertical Flight Society’s Inaugural Design-Build-Vertical Flight Student Competition. We placed 3rd on our Preliminary Design Report, submitted our Final Technical Report in March, and presented our eVTOL aircraft to judges in April—finishing 3rd overall.",
    accomplishments: ["🏆 3rd Place in VFS Challenge"],
  },
];

export const GROUPME_URL = "https://groupme.com/join_group/109585496/EOFNlWHO";