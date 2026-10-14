import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { SITE } from "@/config/site";
import { scrollToSection } from "@/App";

const EASE = [0.22, 1, 0.36, 1];

const MaskedLine = ({ children, delay = 0, className = "" }) => (
  <span className={`block overflow-hidden ${className}`}>
    <motion.span
      className="block will-change-transform"
      initial={{ y: "115%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

const DocStack = () => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 110, damping: 16 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-11, 11]), { stiffness: 110, damping: 16 });

  const docs = [
    { label: "Confidential Information Memorandum", tag: "CIM" },
    { label: "Integrated Financial Model", tag: "XLSX" },
    { label: "Blind Teaser", tag: "PDF" },
  ];

  return (
    <div
      className="hidden lg:block"
      style={{ perspective: 1200 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      data-testid="hero-doc-stack"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-[380px] w-[300px]"
      >
        {docs.map((doc, i) => (
          <motion.div
            key={doc.label}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.18, duration: 1, ease: EASE }}
            style={{ z: i * 46, x: i * 26, y: -i * 20 }}
            className="absolute inset-0 flex flex-col justify-between border border-white/15 bg-white/[0.05] p-7 backdrop-blur-sm"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">
                Project Ironbend
              </p>
              <p className="text-[10px] uppercase tracking-[0.35em] text-slate-600">
                Strictly Confidential
              </p>
            </div>
            <div>
              <p className="font-serif-display text-2xl leading-tight text-slate-200">
                {doc.label}
              </p>
              <p className="mt-3 inline-block border border-white/20 px-2 py-1 text-[10px] uppercase tracking-[0.25em] text-slate-400">
                {doc.tag}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="noise relative flex min-h-screen items-center overflow-hidden bg-[#0A1128]"
      data-testid="hero-section"
    >
      <div className="hero-grid-lines absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 72% 30%, rgba(51,65,85,0.55), transparent 70%)",
        }}
      />
      <motion.p
        style={{ y: bgY }}
        className="text-outline font-serif-display pointer-events-none absolute -bottom-10 right-0 select-none text-[22vw] leading-none italic"
        aria-hidden="true"
      >
        Ironbend
      </motion.p>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 pb-28 pt-36 lg:grid-cols-[1.4fr_1fr] lg:px-10"
      >
        <div>
          <MaskedLine delay={0.15}>
            <span className="mb-8 flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.4em] text-slate-400">
              <span className="h-px w-10 bg-slate-500" />
              Portfolio — {SITE.role}
            </span>
          </MaskedLine>

          <h1 className="font-serif-display text-slate-50" data-testid="hero-name">
            <MaskedLine delay={0.3} className="text-6xl font-medium leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              Sarthak
            </MaskedLine>
            <MaskedLine delay={0.42} className="text-6xl font-light italic leading-[0.95] tracking-tight text-slate-300 sm:text-7xl lg:text-8xl">
              Anand
            </MaskedLine>
          </h1>

          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2" data-testid="hero-tagline">
            {SITE.tagline.map((item, i) => (
              <MaskedLine key={item} delay={0.6 + i * 0.1}>
                <span className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-slate-300 sm:text-sm">
                  {item}
                  {i < SITE.tagline.length - 1 && <span className="text-slate-600">/</span>}
                </span>
              </MaskedLine>
            ))}
          </div>

          <MaskedLine delay={1.05}>
            <span className="mt-8 block max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base" data-testid="hero-intro">
              {SITE.intro}
              <span className="mt-1 block text-slate-500">{SITE.credential}</span>
            </span>
          </MaskedLine>

          <MaskedLine delay={1.2}>
            <span className="mt-12 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToSection("#portfolio")}
                data-testid="hero-view-project-button"
                className="group inline-flex items-center gap-3 bg-slate-50 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900 transition-transform duration-300 hover:-translate-y-0.5"
              >
                View Work
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <a
                href={SITE.resume}
                target="_blank"
                rel="noreferrer"
                data-testid="hero-resume-button"
                className="inline-flex items-center gap-3 border border-slate-600 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 transition-colors duration-300 hover:border-slate-300 hover:text-white"
              >
                <Download size={15} />
                Résumé
              </a>
            </span>
          </MaskedLine>
        </div>

        <DocStack />
      </motion.div>

      <motion.button
        onClick={() => scrollToSection("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-6 z-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-slate-500 transition-colors hover:text-slate-300 lg:left-10"
        data-testid="hero-scroll-indicator"
      >
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
          <ArrowDown size={14} />
        </motion.span>
        Scroll
      </motion.button>
    </section>
  );
};

export default Hero;
