import { Eye, FileText, Table2 } from "lucide-react";
import { PROJECT } from "@/config/site";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { useFileGate } from "@/components/files/FileGate";

const DeliverableCard = ({ d, index, onOpen }) => (
  <Reveal
    as="article"
    delay={(index % 2) * 80}
    className="card group flex flex-col justify-between p-6 transition-colors duration-150 hover:border-[var(--iron)] sm:p-8"
    data-testid={`deliverable-card-${d.id}`}
  >
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow">{d.overline}</p>
        <p className="font-mono text-xs text-[var(--iron)]">{d.no}</p>
      </div>
      <h3 className="font-heading mt-8 text-[32px] leading-[1.1] text-[var(--white)]">{d.title}</h3>
      <p className="mt-4 text-sm leading-[1.6] text-[var(--ash)]">{d.description}</p>
    </div>

    <div className="mt-10 flex items-center justify-between gap-4 border-t border-[var(--hairline)] pt-6">
      <span className="badge gap-1.5">
        {d.format === "PDF" ? <FileText size={12} strokeWidth={1.5} /> : <Table2 size={12} strokeWidth={1.5} />}
        {d.format}
      </span>
      <button onClick={() => onOpen(d.fileId)} className="btn-ghost" data-testid={`deliverable-button-${d.id}`}>
        <Eye size={15} strokeWidth={1.5} /> View or email
      </button>
    </div>
  </Reveal>
);

const Project = () => {
  const openFile = useFileGate();

  return (
    <section id="portfolio" className="border-t border-[var(--hairline)] px-4 py-24 sm:px-6" data-testid="portfolio-section">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeader eyebrow={PROJECT.label} title={PROJECT.codeName}>
          {PROJECT.description}
        </SectionHeader>

        <Reveal as="dl" className="card mt-16 grid grid-cols-2 overflow-hidden lg:grid-cols-4" data-testid="project-snapshot">
          {PROJECT.snapshot.map((m, i) => (
            <div
              key={m.label}
              className={`p-6 sm:p-8 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""} border-[var(--hairline)]`}
            >
              <dt className="eyebrow">{m.label}</dt>
              <dd className="font-heading mt-3 text-[28px] leading-none text-[var(--white)] sm:text-[40px]">{m.value}</dd>
            </div>
          ))}
        </Reveal>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2" data-testid="deliverables-grid">
          {PROJECT.deliverables.map((d, i) => (
            <DeliverableCard key={d.id} d={d} index={i} onOpen={openFile} />
          ))}
        </div>

        <p className="mt-8 font-mono text-xs text-[var(--iron)]" data-testid="project-note">
          Mock engagement — prepared to demonstrate transaction materials.
        </p>
      </div>
    </section>
  );
};

export default Project;
