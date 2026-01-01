import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  brainwave,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  coins,
  yourlogo,
  logox,
} from "../assets";
import card8 from '../assets/benefits/card-8.png';
import card2 from '../assets/benefits/card-2.jpg';
import card3 from '../assets/benefits/card-3.avif';
import card9 from '../assets/benefits/card-9.avif';
import card10 from '../assets/benefits/card-10.png';
import card11 from '../assets/services/service--1.jpg';
import dev from '../assets/notification/image-1.png';
export const navigation = [
  {
    id: "0",
    title: "Services",
    url: "#Services",
  },
  {
    id: "1",
    title: "Explore",
    url: "#explore",
  },
  {
    id: "2",
    title: "Our Edge",
    url: "#Our-Edge",
  },

  {
    id: "3",
    title: "Scope",
    url: "#features",
  },
  {
    id: "4",
    title: "Join us",
    url: "#Join Us",
  },
  {
    id: "6",
    title: "Sign in",
    url: "#login",
    onlyMobile: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [logox,];

export const brainwaveServices = [

  "Real - time patient insights",

  "Actionable medical reports",

  "Specialist support across sectors",

  "Doctor - ready preliminary assessments",

  "Historical record comparison",

  "Advanced diagnostic decision system",

  "AI - powered diagnosis for specialists",
];


export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [

  {
    id: "1",
    title: "Integrated Financial System",
    text: "Allow patients to schedule and manage appointments across Healthcares and hospitals effortlessly.",
    date: "Q2 2024",
    status: "done",
    imageUrl: coins,
  },
  {
    id: "2",
    title: "Pharmacy Stock Automation",
    text: "Track medicine inventory, set expiration alerts,  Sales and pos Customers controll Inevntory mangment automate dproduct seeing fiancial ayltics and automate reordering for partner pharmacies.",
    date: "Q3 2024",
    status: "done",
    imageUrl: roadmap3,
  },

  {
    id: "3",
    title: "Full Ai Integration & Cross-Facility Specialist Tracking",
    text: "Enable specialists to work across sectors with synced patient data, schedules, and reports.",
    date: "Q3 2024",
    status: "progress",
    imageUrl: roadmap4,

  },
  {
    id: "5",
    title: "Smart Dashboard Insights",
    text: "Advanced analytics for admins showing revenue trends, appointment flow, and staff performance.  advnced diagnosing portal,Auto Managment of medical record  ,10+ features , Discover more",
    date: "Q4 2024",
    status: "done",
    imageUrl: roadmap2,
  },

];

export const collabText =
  "With smart automation and top-notch security, it's the perfect solution for teams looking to work smarter.";

export const collabContent = [
  {
    id: "0",
    title: "Seamless Integration",
    text: collabText,
  },
  {
    id: "1",
    title: "Smart Automation",
  },
  {
    id: "2",
    title: "Top-notch Security",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: framer,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
  },
];

export const pricing = [

  {
    id: "1",
    title: "Health Secter",
    description: "Advanced appointments, diagnose port, priority support, analytics dashboard",
    price: "3500",
    features: [
      "1 Weak Free Trial Period",
      " Seperated portals for all with maxium ui and security & Speed",
      "An advanced controll over records appointments ",
      "An analytics dashboard to track your conversations",
      "Priority support to solve issues quickly",
      "Advanced Diagnostic tools and comming soon AI Integration ",
      "Personalized recommendations based on your preferences",
      "Access to more then 10+  features ",
      "Ability to explore the site and its features without any cost",
      "Offline operation with  sync & lifetime Support and Service",
    ],

  },
  {
    id: "2",
    title: "pharmacy",
    description:
      "Elite, all‑in‑one pharmacy control — fast, secure, and built to automate everything.",
    price: "2000",
    features: [
      "1 Weak Free Trial Period  ",
      "Full Inventory Stock ,Bin ,Product ,expiry Mangment ",
      "Role‑based portals for pharmacists, staff, and admins",
      "FEFO inventory automation with expiry alerts",
      "Integrated sales & POS with multi‑payment support",
      "Prescription tracking with patient linkage",
      "AI‑powered Sales and stock forecasting",
      "Analytics for sales, stock, and performance",
      "Automated audit trails and compliance reports",
      "Offline operation with  sync & lifetime Support and Service",
    ]
  }



];
export const benefits = [
  {
    id: "0",
    title: "Precision & Efficiency at Scale",
    text: "Automated Appointment Mastery — AI-driven scheduling that slashes wait times and boosts clinic efficiency.24/7 Secure Operations — Offline-safe and encrypted, ensuring reliability even in non-stop care environments.",
    backgroundUrl: card8,
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
    light: false,
  },
  {
    id: "1",
    title: "Intelligent Tools for Smart Specialists",
    text: "Smart Specialist Dashboards — Real-time access to critical insights for optimized patient care  Analytics-Powered Admin — Financial and operational analytics to drive smart decisions   AI- Driven Diagnosis — Predictive precision with advanced data analysis",
    backgroundUrl: card2,
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Real-Time Patient Engagement",
    text: "Live Patient Monitoring — Track vitals in real-time to ensure fast interventions.Digital Records & E-Prescriptions — Seamless and secure access to documentation and meds.Full Medical History Access — Empower staff with instant insights into patient journeys.",
    backgroundUrl: card3,
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
    light: false,
  },
  {
    id: "3",
    title: "Visibility & Reputation Building",
    text: "Popularity Tracking — Showcase top-performing staff and sentiment metrics.Global Healthcare Branding — Extend reach with targeted advertising and a trusted digital presence.",
    backgroundUrl: card9,
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "4",
    title: "Healthcare in Every Hand",
    text: "Mobile Access — Empower users with healthcare on-the-go, anytime, anywhere.Familier UI — Crisp, safe- feeling design with human - forward aesthetics.",
    backgroundUrl: card10,
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "5",
    title: "Pharmacy Management",
    text: "Seamlessly unite inventory control, sales tracking, POS operations, prescription handling, and customer care in one intelligent, intuitive platform — built for speed, accuracy, and effortless growth.",
    backgroundUrl: card11,
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  }

];


export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];
