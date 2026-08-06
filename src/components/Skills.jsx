import { motion } from "framer-motion";
import { SKILLS } from "@/config/site";

const EASE = [0.22, 1, 0.36, 1];

const Skills = () => (
  <section id="skills" className="bg-[#F9FAF8] px-6 py-28 lg:px-10 lg:py-36" data-testid="skills-section">
    <div className="mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
      >
        <div>
          <p className="flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.4em] text-slate-500">
            <span className="h-px w-10 bg-slate-300" />
            Capabilities
          </p>
          <h2 className="font-serif-display mt-6 text-4xl font-medium tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Technical <span className="italic text-slate-500">toolkit.</span>
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-slate-600">
          The core disciplines and tools I apply across modeling, valuation, and transaction work.
        </p>
      </motion.div>

      <div className="mt-14 flex flex-wrap gap-3" data-testid="skills-grid">
        {SKILLS.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.05, ease: EASE }}
            whileHover={{ y: -3 }}
            className="cursor-default border border-slate-300 bg-white px-5 py-2.5 text-xs font-medium uppercase tracking-[0.16em] text-slate-700 shadow-sm transition-colors duration-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
            data-testid={`skill-badge-${skill.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
