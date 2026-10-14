import { motion } from "framer-motion";
import { SKILL_GROUPS } from "@/config/site";

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
          The disciplines and tools I apply across modeling, valuation, transactions, and revenue generation.
        </p>
      </motion.div>

      <div className="mt-14 grid grid-cols-1 gap-px border border-slate-200 bg-slate-200 md:grid-cols-2" data-testid="skills-grid">
        {SKILL_GROUPS.map((group, gi) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: (gi % 2) * 0.1, ease: EASE }}
            className="bg-white p-8 lg:p-10"
            data-testid={`skill-group-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
          >
            <div className="flex items-baseline justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-900">{group.title}</h3>
              <span className="font-serif-display text-lg italic text-slate-300">0{gi + 1}</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="cursor-default border border-slate-300 bg-white px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-700 transition-colors duration-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
                  data-testid={`skill-badge-${skill.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
