import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { SITE, NAV_LINKS } from "@/config/site";
import { scrollToSection } from "@/App";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href) => {
    setOpen(false);
    scrollToSection(href);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        scrolled
          ? "border-slate-200/70 bg-white/70 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <button
          onClick={() => go("#home")}
          data-testid="navbar-brand"
          className={`text-left text-xs font-semibold uppercase tracking-[0.3em] transition-colors duration-500 ${
            scrolled ? "text-slate-900" : "text-slate-100"
          }`}
        >
          {SITE.name}
          <span
            className={`mt-0.5 block text-[10px] font-normal tracking-[0.2em] ${
              scrolled ? "text-slate-500" : "text-slate-400"
            }`}
          >
            Advisory &amp; Research
          </span>
        </button>

        <nav className="hidden items-center gap-10 md:flex" data-testid="navbar-links">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => go(link.href)}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
              className={`nav-link-underline text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-500 ${
                scrolled ? "text-slate-700 hover:text-slate-900" : "text-slate-300 hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          data-testid="mobile-menu-button"
          aria-label="Toggle menu"
          className={`md:hidden ${scrolled ? "text-slate-900" : "text-slate-100"}`}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-slate-200/70 bg-white/95 backdrop-blur-xl md:hidden"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col px-6 py-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => go(link.href)}
                  data-testid={`mobile-nav-link-${link.label.toLowerCase()}`}
                  className="border-b border-slate-100 py-4 text-left text-sm font-medium uppercase tracking-[0.18em] text-slate-800 last:border-0"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
