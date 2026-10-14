import Reveal from "@/components/Reveal";

const SectionHeader = ({ eyebrow, title, children, id }) => (
  <Reveal className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-end">
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="font-heading mt-4 text-[40px] leading-[1.1] text-[var(--white)] sm:text-[56px] sm:leading-[1.2]">
        {title}
      </h2>
    </div>
    {children && <p className="max-w-xl text-base leading-[1.6] text-[var(--ash)] sm:text-lg lg:justify-self-end">{children}</p>}
  </Reveal>
);

export default SectionHeader;
