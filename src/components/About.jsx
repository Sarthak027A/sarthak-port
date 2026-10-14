import { GraduationCap, BadgeCheck } from "lucide-react";
import { SITE, CHAPTERS } from "@/config/site";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";

const CREDENTIALS = [
  { icon: GraduationCap, title: "B.Tech — Mechanical Engineering", sub: "National Institute of Technology Karnataka (NITK)" },
  { icon: BadgeCheck, title: SITE.credential, sub: "CFA Institute" },
];

const About = () => (
  <section id="about" className="border-t border-[var(--hairline)] px-4 py-24 sm:px-6" data-testid="about-section">
    <div className="mx-auto max-w-[1200px]">
      <SectionHeader eyebrow="About" title="An analyst who also sells.">
        I build the analytical materials that drive decisions — models, memoranda and market
        intelligence — and the commercial engine around them: who to target, why now, and the
        business case that moves them.
      </SectionHeader>

      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2" data-testid="about-credentials">
        {CREDENTIALS.map((c, i) => (
          <Reveal key={c.title} delay={i * 80} className="card flex items-start gap-4 p-6 sm:p-8" data-testid={`credential-card-${i}`}>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-white" style={{ background: "var(--iris-gradient)" }}>
              <c.icon size={18} strokeWidth={1.5} />
            </span>
            <div>
              <p className="text-base font-medium text-[var(--white)]">{c.title}</p>
              <p className="mt-1 text-sm text-[var(--ash)]">{c.sub}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="about-chapters">
        {CHAPTERS.map((ch, i) => (
          <Reveal key={ch.no} as="article" delay={(i % 3) * 80} className="card p-6 sm:p-8" data-testid={`chapter-${ch.no}`}>
            <p className="font-mono text-xs text-[var(--iron)]">{ch.no}</p>
            <h3 className="mt-6 text-xl font-medium tracking-tight text-[var(--white)]">{ch.title}</h3>
            <p className="mt-3 text-sm leading-[1.6] text-[var(--ash)]">{ch.body}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default About;
