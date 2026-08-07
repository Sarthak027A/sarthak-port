// ─────────────────────────────────────────────────────────────────
// SITE CONFIG — the only file you need to edit.
// To swap a file, replace its URL below. Excel files open in the
// Microsoft Office online viewer via OFFICE_VIEWER; PDFs open directly.
// ─────────────────────────────────────────────────────────────────

const OFFICE_VIEWER = "https://view.officeapps.live.com/op/view.aspx?src=";
const viewExcel = (url) => `${OFFICE_VIEWER}${encodeURIComponent(url)}`;

export const SITE = {
  name: "Sarthak Anand",
  tagline: ["Financial Modeling", "Valuation", "M&A Advisory", "Investment Research"],
  intro:
    "Bachelor of Technology in Mechanical Engineering — National Institute of Technology Karnataka (NITK)",
  credential: "CFA Level I — Passed",
  email: "sarthakanand.sp01@gmail.com",
  phone: "+91 9263776530",
  linkedin: "https://www.linkedin.com/in/sarthak-anand-668a17258/",
  resume: "https://customer-assets-7cd3h4nn.emergentagent.net/job_ironbend-advisory/artifacts/1wt8ur79_Sarthak_Anand_Resume.pdf",
};

export const PROJECT = {
  label: "Featured Engagement",
  codeName: "Project Ironbend",
  description:
    "A complete mock end-to-end lower middle-market advisory engagement — from first-touch marketing materials through buyer outreach and process management. Every deliverable mirrors the format, rigour, and analytical depth of institutional transaction work.",
  deliverables: [
    {
      id: "teaser",
      no: "01",
      overline: "Confidential — Sample",
      title: "Blind Teaser",
      format: "PDF",
      action: "View PDF",
      link: "https://customer-assets-7cd3h4nn.emergentagent.net/job_ironbend-advisory/artifacts/0arzfq25_Project_Ironbend_Teaser_PitchBook.pdf",
      description:
        "A one-page anonymous marketing snapshot presenting the opportunity without disclosing the company's identity — investment highlights, summary financials, and sector positioning.",
    },
    {
      id: "cim",
      no: "02",
      overline: "Confidential Information Memorandum",
      title: "CIM",
      format: "PDF",
      action: "View PDF",
      link: "https://customer-assets-7cd3h4nn.emergentagent.net/job_ironbend-advisory/artifacts/j7bhboeo_Northline_PitchBook_CIM.pdf",
      description:
        "A full Confidential Information Memorandum covering the business overview, market landscape, growth drivers, historical and projected financials, and the investment thesis.",
    },
    {
      id: "model",
      no: "03",
      overline: "Integrated Three-Statement Model",
      title: "Financial Model",
      format: "XLSX",
      action: "View Excel",
      link: viewExcel("https://customer-assets-7cd3h4nn.emergentagent.net/job_ironbend-advisory/artifacts/j9ttgo31_Project_Ironbend_Valuation_Model .xlsx"),
      description:
        "A fully linked three-statement model with Low/Base/High scenario switching, EV/EBITDA-based valuation with sensitivity analysis, sources & uses, advisor fee build, and illustrative sponsor returns.",
    },
    {
      id: "tracker",
      no: "04",
      overline: "Process Management",
      title: "Buyer Tracker",
      format: "XLSX",
      action: "View Excel",
      link: viewExcel("https://customer-assets-7cd3h4nn.emergentagent.net/job_ironbend-advisory/artifacts/x6h2jsh7_Project_Ironbend_Tracker.xlsx"),
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
    span: "lg:col-span-7",
  },
  {
    no: "02",
    title: "Valuation",
    body: "Triangulating intrinsic and relative worth through discounted cash flow analysis, trading comparables, and precedent transactions.",
    span: "lg:col-span-5",
  },
  {
  no: "03",
  title: "Corporate Finance",
  body: "Capital structure, allocation decisions, and the financial mechanics that drive enterprise value.",
  span: "lg:col-span-7",
},
{
  no: "04",
  title: "Mergers & Acquisitions",
  body: "The anatomy of a deal — teasers, memoranda, buyer screening, and process discipline from first contact to close.",
  span: "lg:col-span-5",
},
  {
    no: "05",
    title: "Investment Research",
    body: "Thesis-driven analysis of sectors, business models, and capital flows — turning information into conviction.",
    span: "lg:col-span-12",
  },
];

export const SKILLS = [
  "Financial Modeling",
  "Valuation",
  "Financial Statement Analysis",
  "Comparable Company Analysis",
  "Investment Research",
  "Corporate Finance",
  "Microsoft Excel",
  "PowerPoint",
  "Transaction Analysis",
  "M&A Process",
];

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
