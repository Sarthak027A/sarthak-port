import { ArrowRight, ChevronRight } from "lucide-react";
import { SITE } from "@/config/site";
import { useFileGate } from "@/components/files/FileGate";

const Cube = () => (
  <div className="cube-scene flex items-center justify-center" aria-hidden="true">
    <div className="cube">
      {["front", "back", "right", "left", "top", "bottom"].map((f) => (
        <div key={f} className={`cube__face cube__face--${f}`} />
      ))}
    </div>
  </div>
);

const Hero = () => {
  const openFile = useFileGate();

  return (
    <section id="home" className="relative overflow-hidden px-4 pb-24 pt-36 sm:px-6 sm:pt-44" data-testid="hero-section">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-16 lg:grid-cols-[1.35fr_1fr]">
        <div className="hero-in">
          <a
            href="#contact"
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] px-3 py-1.5 text-sm text-[var(--bone)] transition-colors duration-150 hover:border-[var(--iron)]"
            data-testid="hero-pill"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
            Open to finance &amp; business development roles
            <ChevronRight size={14} className="text-[var(--iris)]" />
          </a>

          <h1 className="font-display mt-8 text-[56px] leading-none text-[var(--white)] sm:text-[77px] lg:text-[96px]" data-testid="hero-name">
            {SITE.name}
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-[1.6] text-[var(--ash)]" data-testid="hero-intro">
            Financial modeling, valuation and M&amp;A — and the pipeline that brings the deals in.
            Mechanical Engineering, NITK. CFA Level I passed.
          </p>

          <ul className="mt-8 flex flex-wrap gap-2" data-testid="hero-tagline">
            {SITE.tagline.map((t) => (
              <li key={t} className="badge">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#portfolio" className="btn-ghost" data-testid="hero-view-project-button">
              View work <ArrowRight size={15} strokeWidth={1.5} />
            </a>
            <button onClick={() => openFile(SITE.resumeFile)} className="btn-ghost" data-testid="hero-resume-button">
              Résumé
            </button>
          </div>
        </div>

        <div className="hidden justify-center lg:flex" data-testid="hero-cube">
          <Cube />
        </div>
      </div>
    </section>
  );
};

export default Hero;
