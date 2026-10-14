import { motion } from "framer-motion";
import { PIPELINE } from "@/config/site";

const EASE = [0.22, 1, 0.36, 1];

const TIER_MARK = {
  Hot: "bg-slate-50",
  Warm: "bg-slate-300",
  Nurture: "bg-slate-500",
  Excluded: "bg-slate-700",
};

const StageCard = ({ stage, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
    className="relative flex flex-col bg-white p-8 lg:p-9"
    data-testid={`pipeline-stage-${stage.no}`}
  >
    <div className="flex items-center gap-4">
      <span className="font-serif-display text-2xl italic text-slate-300">{stage.no}</span>
      <span className="h-px flex-1 bg-slate-200" />
    </div>
    <h3 className="font-serif-display mt-6 text-3xl font-medium tracking-tight text-slate-900">
      {stage.title}
    </h3>
    <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">{stage.body}</p>
    <ul className="mt-8 flex flex-wrap gap-2">
      {stage.tools.map((t) => (
        <li
          key={t}
          className="border border-slate-200 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500"
        >
          {t}
        </li>
      ))}
    </ul>
  </motion.article>
);

const Tiers = ({ tiers }) => (
  <div data-testid="pipeline-tiers">
    <p className="border-b border-white/10 pb-5 text-[10px] uppercase tracking-[0.3em] text-slate-500">
      Pipeline tiers
    </p>
    <ul className="mt-2">
      {tiers.map((t, i) => (
        <motion.li
          key={t.tier}
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: EASE }}
          className="flex gap-5 border-b border-white/[0.07] py-5"
          data-testid={`pipeline-tier-${t.tier.toLowerCase()}`}
        >
          <span className={`mt-1.5 h-2 w-2 shrink-0 ${TIER_MARK[t.tier]}`} />
          <div className="flex-1">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">{t.tier}</span>
              <span className="font-mono text-xs text-slate-400">{t.rule}</span>
            </div>
            <p className="mt-1.5 text-sm text-slate-400">{t.action}</p>
          </div>
        </motion.li>
      ))}
    </ul>
  </div>
);

const Pipeline = () => {
  const { method: cs } = PIPELINE;

  return (
    <section id="pipeline" className="bg-[#F9FAF8] px-6 py-28 lg:px-10 lg:py-40" data-testid="pipeline-section">
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
              {PIPELINE.label}
            </p>
            <h2 className="font-serif-display mt-6 text-5xl font-medium leading-[1.02] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
              Building the <span className="italic text-slate-500">pipeline.</span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-slate-600 lg:justify-self-end" data-testid="pipeline-intro">
            {PIPELINE.intro}
          </p>
        </motion.div>

        {/* Process */}
        <div
          className="mt-20 grid grid-cols-1 gap-px border border-slate-200 bg-slate-200 md:grid-cols-2 xl:grid-cols-4"
          data-testid="pipeline-stages"
        >
          {PIPELINE.stages.map((s, i) => (
            <StageCard key={s.no} stage={s} index={i} />
          ))}
        </div>

        {/* Method */}
        <motion.article
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="noise relative mt-16 overflow-hidden bg-[#0A1128] p-8 sm:p-12 lg:p-16"
          data-testid="pipeline-method"
        >
          <div className="relative z-10 grid grid-cols-1 gap-14 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-500">{cs.overline}</p>
              <h3 className="font-serif-display mt-6 text-3xl font-medium leading-tight tracking-tight text-slate-50 sm:text-4xl">
                {cs.title}
              </h3>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-400">{cs.body}</p>

              <div className="mt-10">
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Top scoring signals</p>
                <table className="mt-4 w-full max-w-md text-left" data-testid="pipeline-signals">
                  <tbody>
                    {cs.signals.map((s) => (
                      <tr key={s.signal} className="border-b border-white/[0.07]">
                        <td className="py-2.5 text-sm text-slate-300">{s.signal}</td>
                        <td className="py-2.5 text-right font-mono text-sm text-slate-400">{s.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <Tiers tiers={cs.tiers} />
          </div>
        </motion.article>

      </div>
    </section>
  );
};

export default Pipeline;
