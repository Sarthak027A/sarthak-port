import { SKILL_GROUPS } from "@/config/site";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const Skills = () => (
  <section id="skills" className="border-t border-[var(--hairline)] px-4 py-24 sm:px-6" data-testid="skills-section">
    <div className="mx-auto max-w-[1200px]">
      <SectionHeader eyebrow="Capabilities" title="Toolkit.">
        The disciplines and tools I apply across modeling, valuation, transactions, and revenue generation.
      </SectionHeader>

      <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2" data-testid="skills-grid">
        {SKILL_GROUPS.map((group, gi) => (
          <Reveal key={group.title} delay={(gi % 2) * 80} className="card p-6 sm:p-8" data-testid={`skill-group-${slug(group.title)}`}>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium text-[var(--white)]">{group.title}</h3>
              <span className="font-mono text-xs text-[var(--iron)]">0{gi + 1}</span>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <li key={skill} className="badge text-[var(--bone)]" data-testid={`skill-badge-${slug(skill)}`}>
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
