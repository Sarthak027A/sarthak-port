import { PIPELINE } from "@/config/site";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";

const TIER_DOT = {
  Hot: "var(--green)",
  Warm: "var(--sky)",
  Nurture: "var(--iris-glow)",
  Excluded: "var(--red)",
};

const StageCard = ({ stage, index }) => (
  <Reveal as="article" delay={index * 80} className="card flex flex-col p-6 sm:p-8" data-testid={`pipeline-stage-${stage.no}`}>
    <p className="font-mono text-xs text-[var(--iron)]">{stage.no}</p>
    <h3 className="mt-6 text-xl font-medium tracking-tight text-[var(--white)]">{stage.title}</h3>
    <p className="mt-3 flex-1 text-sm leading-[1.6] text-[var(--ash)]">{stage.body}</p>
    <ul className="mt-6 flex flex-wrap gap-2">
      {stage.tools.map((t) => (
        <li key={t} className="badge">
          {t}
        </li>
      ))}
    </ul>
  </Reveal>
);

// Terminal-style window showing the scoring method (no client data).
const ScoringWindow = ({ method }) => (
  <Reveal className="card mt-4 overflow-hidden" data-testid="pipeline-method">
    <div className="flex items-center gap-2 border-b border-[var(--hairline)] px-4 py-3">
      <span className="h-2 w-2 rounded-full bg-[var(--hairline)]" />
      <span className="h-2 w-2 rounded-full bg-[var(--hairline)]" />
      <span className="h-2 w-2 rounded-full bg-[var(--hairline)]" />
      <span className="ml-3 font-mono text-xs text-[var(--ash)]">lead_scoring.py</span>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
      <div className="p-6 sm:p-8">
        <p className="eyebrow">{method.overline}</p>
        <h3 className="font-heading mt-4 text-[28px] leading-[1.15] text-[var(--white)] sm:text-[32px]">{method.title}</h3>
        <p className="mt-4 text-sm leading-[1.6] text-[var(--ash)]">{method.body}</p>

        <table className="mt-8 w-full font-mono text-sm" data-testid="pipeline-signals">
          <caption className="pb-3 text-left text-xs text-[var(--iron)]"># weighted signals</caption>
          <tbody>
            {method.signals.map((s) => (
              <tr key={s.signal} className="border-t border-[var(--hairline)]">
                <td className="py-2.5 text-[var(--bone)]">{s.signal}</td>
                <td className="py-2.5 text-right text-[var(--green)]">{s.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-[var(--hairline)] p-6 sm:p-8 lg:border-l lg:border-t-0" data-testid="pipeline-tiers">
        <p className="font-mono text-xs text-[var(--iron)]"># pipeline tiers</p>
        <ul className="mt-3">
          {method.tiers.map((t) => (
            <li key={t.tier} className="border-t border-[var(--hairline)] py-4 first:border-t-0" data-testid={`pipeline-tier-${t.tier.toLowerCase()}`}>
              <div className="flex items-center justify-between gap-4 font-mono text-sm">
                <span className="flex items-center gap-2.5 text-[var(--white)]">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: TIER_DOT[t.tier] }} />
                  {t.tier.toLowerCase()}
                </span>
                <span className="text-[var(--iris)]">{t.rule}</span>
              </div>
              <p className="mt-1.5 pl-4 text-sm text-[var(--ash)]">{t.action}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Reveal>
);

const Pipeline = () => (
  <section id="pipeline" className="border-t border-[var(--hairline)] px-4 py-24 sm:px-6" data-testid="pipeline-section">
    <div className="mx-auto max-w-[1200px]">
      <SectionHeader eyebrow={PIPELINE.label} title="Building the pipeline.">
        {PIPELINE.intro}
      </SectionHeader>

      <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4" data-testid="pipeline-stages">
        {PIPELINE.stages.map((s, i) => (
          <StageCard key={s.no} stage={s} index={i} />
        ))}
      </div>

      <ScoringWindow method={PIPELINE.method} />
    </div>
  </section>
);

export default Pipeline;
