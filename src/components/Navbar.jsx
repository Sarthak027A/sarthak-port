import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { SITE, NAV_LINKS } from "@/config/site";
import { useFileGate } from "@/components/files/FileGate";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const openFile = useFileGate();
  const progress = useRef(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrolled(window.scrollY > 8);
        if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b px-4 transition-colors sm:px-6 duration-150 ${
        scrolled || open ? "border-[var(--hairline)] bg-black/[0.92] backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between">
        <a href="#home" className="focus-ring rounded text-[15px] font-medium tracking-tight text-[var(--white)]" data-testid="navbar-brand">
          {SITE.name}
        </a>

        <nav className="hidden items-center gap-8 md:flex" data-testid="navbar-links">
          {NAV_LINKS.filter((l) => l.href !== "#home").map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="focus-ring rounded text-sm text-[var(--bone)] transition-colors duration-150 hover:text-[var(--white)]"
              data-testid={`nav-link-${link.label.toLowerCase()}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={() => openFile(SITE.resumeFile)} className="btn-ghost !py-2 text-sm" data-testid="nav-resume-button">
            Résumé
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="focus-ring rounded p-1 text-[var(--white)] md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            data-testid="mobile-menu-button"
          >
            {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <span
        ref={progress}
        className="absolute bottom-[-1px] left-0 h-px w-full origin-left bg-[var(--iris)]"
        style={{ transform: "scaleX(0)" }}
        aria-hidden="true"
      />

      {open && (
        <nav className="border-t border-[var(--hairline)] pb-4 md:hidden" data-testid="mobile-menu">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-[var(--hairline)] py-4 text-base text-[var(--bone)] last:border-0"
              data-testid={`mobile-nav-link-${link.label.toLowerCase()}`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
