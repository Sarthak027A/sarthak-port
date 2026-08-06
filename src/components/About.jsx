import { motion } from "framer-motion";
import { GraduationCap, BadgeCheck } from "lucide-react";
import { SITE, CHAPTERS } from "@/config/site";

const EASE = [0.22, 1, 0.36, 1];

const About = () => (
  <section id="about" className="bg-[#F9FAF8] px-6 py-28 lg:px-10 lg:py-40" data-testid="about-section">
    <div className="mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <p className="flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.4em] text-slate-500">
          <span className="h-px w-10 bg-slate-300" />
          About
        </p>
        <h2 className="font-serif-display mt-6 max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          An analyst&rsquo;s approach to <span className="italic text-slate-500">transactions.</span>
        </h2>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-slate-600" data-testid="about-bio">
          My work centres on financial modeling, valuation, mergers &amp; acquisitions, corporate
          finance, and investment research — the disciplines that sit at the core of every
          transaction. I build the analytical materials that drive decisions: models, memoranda,
          and market intelligence, executed to an institutional standard.
        </p>
      </motion.div>

      <div className="mt-14 grid gap-px border border-slate-200 bg-slate-200 sm:grid-cols-2" data-testid="about-credentials">
        {[
          { icon: GraduationCap, title: "B.Tech — Mechanical Engineering", sub: "National Institute of Technology Karnataka (NITK)" },
          { icon: BadgeCheck, title: SITE.credential, sub: "CFA Institute" },
        ].map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
            className="flex items-start gap-5 bg-white p-8"
            data-testid={`credential-card-${i}`}
          >
            <c.icon size={22} className="mt-1 shrink-0 text-slate-400" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-900">{c.title}</p>
              <p className="mt-1.5 text-sm text-slate-500">{c.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-24 grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-12" data-testid="about-chapters">
        {CHAPTERS.map((ch, i) => (
          <motion.article
            key={ch.no}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: (i % 2) * 0.12, ease: EASE }}
            className={`border-t border-slate-300 pt-8 ${ch.span}`}
            data-testid={`chapter-${ch.no}`}
          >
            <p className="text-xs font-medium tracking-[0.3em] text-slate-400">{ch.no}</p>
            <h3 className="font-serif-display mt-4 text-3xl font-medium tracking-tight text-slate-900 lg:text-4xl">
              {ch.title}
            </h3>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-600">{ch.body}</p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default About;
