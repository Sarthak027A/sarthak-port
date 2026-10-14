// ─────────────────────────────────────────────────────────────────
// SITE CONFIG — the only file you need to edit for content.
// Downloadable files are listed in files.json (shared with the
// email function in api/send-file.js) and live in public/files/.
// ─────────────────────────────────────────────────────────────────

import FILES from "./files.json";

export { FILES };

export const SITE = {
  name: "Sarthak Anand",
  role: "Finance & Business Development",
  tagline: ["Financial Modeling", "Valuation", "M&A Advisory", "Pipeline & Lead Generation"],
  intro:
    "Bachelor of Technology in Mechanical Engineering — National Institute of Technology Karnataka (NITK)",
  credential: "CFA Level I — Passed",
  email: "sarthakanand.sp01@gmail.com",
  phone: "+91 9263776530",
  linkedin: "https://www.linkedin.com/in/sarthak-anand-668a17258/",
  resumeFile: "resume",
};

export const PROJECT = {
  label: "Featured Engagement",
  codeName: "Project Ironbend",
  description:
    "A complete mock end-to-end lower middle-market advisory engagement — from first-touch marketing materials through buyer outreach and process management. Every deliverable mirrors the format, rigour, and analytical depth of institutional transaction work.",
  snapshot: [
    { label: "Target Revenue", value: "C$9.4M" },
    { label: "EBITDA Margin", value: "22.3%" },
    { label: "Valuation Range", value: "C$9–13M" },
    { label: "EV / EBITDA", value: "4.5x–6.5x" },
  ],
  deliverables: [
    {
      id: "teaser",
      fileId: "teaser",
      no: "01",
      overline: "Confidential — Sample",
      title: "Blind Teaser",
      format: "PDF",
      description:
        "A one-page anonymous marketing snapshot presenting the opportunity without disclosing the company's identity — investment highlights, summary financials, and sector positioning.",
    },
    {
      id: "cim",
      fileId: "cim",
      no: "02",
      overline: "Confidential Information Memorandum",
      title: "CIM",
      format: "PDF",
      description:
        "A full Confidential Information Memorandum covering the business overview, market landscape, growth drivers, historical and projected financials, and the investment thesis.",
    },
    {
      id: "model",
      fileId: "model",
      no: "03",
      overline: "Integrated Three-Statement Model",
      title: "Financial Model",
      format: "XLSX",
      description:
        "A fully linked three-statement model with Low/Base/High scenario switching, EV/EBITDA-based valuation with sensitivity analysis, sources & uses, advisor fee build, and illustrative sponsor returns.",
    },
    {
      id: "tracker",
      fileId: "tracker",
      no: "04",
      overline: "Process Management",
      title: "Buyer Tracker",
      format: "XLSX",
      description:
        "A process-management tracker logging outreach status, NDA execution, diligence stage, and next steps for every party in the buyer universe.",
    },
  ],
};

export const CHAPTERS = [
  {
    no: "01",
    title: "Financial Modeling",
    body: "Building fully-linked, three-statement models that translate operating assumptions into a coherent financial narrative — the backbone of every transaction.",
  },
  {
    no: "02",
    title: "Valuation",
    body: "Triangulating intrinsic and relative worth through discounted cash flow analysis, trading comparables, and precedent transactions.",
  },
  {
    no: "03",
    title: "Corporate Finance",
    body: "Capital structure, allocation decisions, and the financial mechanics that drive enterprise value.",
  },
  {
    no: "04",
    title: "Mergers & Acquisitions",
    body: "The anatomy of a deal — teasers, memoranda, buyer screening, and process discipline from first contact to close.",
  },
  {
    no: "05",
    title: "Investment Research",
    body: "Thesis-driven analysis of sectors, business models, and capital flows — turning information into conviction.",
  },
  {
    no: "06",
    title: "Revenue & Pipeline",
    body: "Defining the ideal client, sourcing and scoring leads on real signals, and building the commercial case that turns a conversation into a mandate.",
  },
];

// ── Revenue & Pipeline ──────────────────────────────────────────
// Methodology only — no client names or client data.
export const PIPELINE = {
  label: "Finance × Sales",
  intro:
    "Good analysis is only half the job — the other half is finding the right counterparties and giving them a reason to engage. I build the commercial engine around the numbers: who to target, why now, and the business case that moves them.",
  stages: [
    {
      no: "01",
      title: "Define & Source",
      body: "Translate the ideal-client profile into geography × industry search grids, then extract and de-duplicate target lists from public business data.",
      tools: ["ICP definition", "Google Maps extraction", "Public registries"],
    },
    {
      no: "02",
      title: "Score & Qualify",
      body: "Rank every account on weighted, evidence-backed signals — industry fit, size proxies, business age, succession or hiring triggers — and auto-exclude franchises, chains and PE-owned firms.",
      tools: ["Python", "Weighted scoring", "Web enrichment"],
    },
    {
      no: "03",
      title: "Engage",
      body: "Map decision-makers per account, open with the exact signal that qualified them, and run disciplined follow-up cadences tracked in a live pipeline.",
      tools: ["Contact mapping", "Evidence-led outreach", "Follow-up cadence"],
    },
    {
      no: "04",
      title: "Convert",
      body: "Close with finance: buyer-side cost cases, pricing and revenue models, and a clear scope — so the decision is an easy one to make.",
      tools: ["Business case", "Pricing model", "Proposal"],
    },
  ],
  method: {
    overline: "Method — Lead Scoring Model",
    title: "From raw business lists to a ranked call sheet",
    body: "A Python scoring layer that turns exported business listings into a prioritised pipeline. Every lead carries a fit score, a recommended service angle, and the evidence behind it — the exact sentence from the company's own website, ready to quote in outreach.",
    tiers: [
      { tier: "Hot", rule: "Score 60+", action: "Strong fit and clear trigger signals — call first" },
      { tier: "Warm", rule: "Score 40–59", action: "Good fit, fewer signals — research the owner, then reach out" },
      { tier: "Nurture", rule: "Below 40", action: "Possible fit, weak evidence — longer sequence" },
      { tier: "Excluded", rule: "Auto-filtered", action: "Franchises, chains, closed or PE-owned businesses" },
    ],
    signals: [
      { signal: "Core industry fit", points: "+30" },
      { signal: "Founded 20+ years ago", points: "+20" },
      { signal: "Established size footprint", points: "+15" },
      { signal: "Retirement / succession language", points: "+12" },
      { signal: "Hiring controller or CFO", points: "+10" },
      { signal: "Family / founder-led", points: "+8" },
    ],
  },
};

export const SKILL_GROUPS = [
  {
    title: "Finance & Valuation",
    items: [
      "Financial Modeling",
      "Three-Statement Models",
      "DCF & Comparable Companies",
      "Financial Statement Analysis",
      "Corporate Finance",
      "Investment Research",
    ],
  },
  {
    title: "Transactions",
    items: ["M&A Process", "Teasers & CIMs", "Buyer Universe & Tracking", "Sources & Uses", "Transaction Analysis"],
  },
  {
    title: "Sales & Pipeline",
    items: [
      "Lead Generation",
      "ICP & Market Mapping",
      "Lead Scoring",
      "Outreach & Follow-up",
      "Pipeline Management",
      "Pricing & Business Cases",
    ],
  },
  {
    title: "Tools",
    items: ["Microsoft Excel", "PowerPoint", "Python", "Data Extraction & Cleaning"],
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pipeline", href: "#pipeline" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
