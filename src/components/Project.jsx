import { motion } from "framer-motion";
import { FileText, Table2, ArrowUpRight } from "lucide-react";
import { PROJECT } from "@/config/site";

const EASE = [0.22, 1, 0.36, 1];

const Corner = ({ className }) => (
  <span className={`pointer-events-none absolute h-3 w-3 border-slate-900/25 ${className}`} />
);

const DeliverableCard = ({ d, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 44 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.85, delay: (index % 3) * 0.12, ease: EASE }}
    whileHover={{ y: -8 }}
    className="group relative flex min-h-[320px] flex-col justify-between border border-slate-200 bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition-shadow duration-500 hover:shadow-2xl lg:p-10"
    data-testid={`deliverable-card-${d.id}`}
  >
    <Corner className="left-0 top-0 border-l border-t" />
    <Corner className="right-0 top-0 border-r border-t" />
    <Corner className="bottom-0 left-0 border-b border-l" />
    <Corner className="bottom-0 right-0 border-b border-r" />

    <div>
      <div className="flex items-start justify-between gap-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-400">
          {d.overline}
        </p>
        <p className="font-serif-display text-lg italic text-slate-300">{d.no}</p>
      </div>
      <h3 className="font-serif-display mt-6 text-3xl font-medium tracking-tight text-slate-900 lg:text-4xl">
        {d.title}
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-slate-600">{d.description}</p>
    </div>

    <div className="mt-10 flex items-center justify-between border-t border-slate-100 pt-6">
      <span className="inline-flex items-center gap-2 border border-slate-200 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
        {d.format === "PDF" ? <FileText size={12} /> : <Table2 size={12} />}
        {d.format}
      </span>
      <a
        href={d.link}
        target="_blank"
        rel="noreferrer"
        data-testid={`deliverable-button-${d.id}`}
        className="inline-flex items-center gap-2 bg-slate-900 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-700"
      >
        {d.action}
        <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </div>
  </motion.article>
);

const Project = () => (
  <section id="portfolio" className="bg-white px-6 py-28 lg:px-10 lg:py-40" data-testid="portfolio-section">
    <div className="mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-end"
      >
        <div>
          <p className="flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.4em] text-slate-500">
            <span className="h-px w-10 bg-slate-300" />
            {PROJECT.label}
          </p>
          <h2 className="font-serif-display mt-6 text-5xl font-medium leading-[1.02] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl" data-testid="project-title">
            Project <span className="italic text-slate-500">Ironbend</span>
          </h2>
        </div>
        <p className="max-w-xl text-base leading-relaxed text-slate-600 lg:justify-self-end" data-testid="project-description">
          {PROJECT.description}
        </p>
      </motion.div>

      <div
        className="pointer-events-none mt-20 h-40 rounded-sm opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 55% 100% at 50% 0%, rgba(10,17,40,0.07), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="-mt-24 grid grid-cols-1 gap-8 md:grid-cols-2" data-testid="deliverables-grid">
        {PROJECT.deliverables.map((d, i) => (
          <DeliverableCard key={d.id} d={d} index={i} />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-12 text-center text-xs uppercase tracking-[0.25em] text-slate-400"
        data-testid="project-note"
      >
        Mock engagement — prepared for demonstration of transaction materials
      </motion.p>
    </div>
  </section>
);

export default Project;
