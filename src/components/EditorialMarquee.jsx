import Marquee from "react-fast-marquee";

const TERMS = [
  "Financial Modeling",
  "Valuation",
  "M&A Advisory",
  "Investment Research",
  "Corporate Finance",
  "Transaction Analysis",
  "Due Diligence",
  "Three-Statement Models",
  "Comparable Companies",
  "Discounted Cash Flow",
];

const EditorialMarquee = () => (
  <section
    className="overflow-hidden border-y border-slate-200 bg-white py-9"
    data-testid="editorial-marquee"
    aria-hidden="true"
  >
    <Marquee speed={32} gradient={false} pauseOnHover>
      {TERMS.map((term) => (
        <span key={term} className="mx-10 flex items-center gap-20">
          <span className="font-serif-display whitespace-nowrap text-2xl italic text-slate-800 md:text-3xl">
            {term}
          </span>
          <span className="h-1.5 w-1.5 rotate-45 bg-slate-300" />
        </span>
      ))}
    </Marquee>
  </section>
);

export default EditorialMarquee;
