import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Download, ArrowUpRight } from "lucide-react";
import { SITE } from "@/config/site";

const EASE = [0.22, 1, 0.36, 1];

const TEXTURE =
  "https://images.unsplash.com/photo-1608501821300-4f99e58bba77?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTB8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMGRhcmslMjBuYXZ5JTIwdGV4dHVyZXxlbnwwfHx8fDE3ODU5Njg2NjZ8MA&ixlib=rb-4.1.0&q=85";

const Contact = () => (
  <section
    id="contact"
    className="noise relative overflow-hidden bg-[#0A1128] px-6 pb-10 pt-28 lg:px-10 lg:pt-40"
    data-testid="contact-section"
  >
    <div
      className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
      style={{ backgroundImage: `url(${TEXTURE})` }}
      aria-hidden="true"
    />

    <div className="relative z-10 mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <p className="flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.4em] text-slate-400">
          <span className="h-px w-10 bg-slate-600" />
          Contact
        </p>
        <h2 className="font-serif-display mt-6 max-w-3xl text-5xl font-medium leading-[1.02] tracking-tight text-slate-50 sm:text-6xl lg:text-7xl">
          Let&rsquo;s talk <span className="italic text-slate-400">transactions.</span>
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Open to conversations around financial modeling, valuation, M&amp;A, and investment
          research — and to sharing the full Project Ironbend materials on request.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        className="mt-14 flex flex-wrap items-center gap-4"
        data-testid="contact-actions"
      >
        <a
          href={`mailto:${SITE.email}`}
          data-testid="contact-email-button"
          className="group inline-flex items-center gap-3 bg-slate-50 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900 transition-transform duration-300 hover:-translate-y-0.5"
        >
          <Mail size={15} />
          {SITE.email}
        </a>
        <a
          href={`tel:${SITE.phone.replace(/\s/g, "")}`}
          data-testid="contact-phone-button"
          className="inline-flex items-center gap-3 border border-slate-600 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 transition-colors duration-300 hover:border-slate-300 hover:text-white"
        >
          <Phone size={15} />
          {SITE.phone}
        </a>
        <a
          href={SITE.linkedin}
          target="_blank"
          rel="noreferrer"
          data-testid="contact-linkedin-button"
          className="inline-flex items-center gap-3 border border-slate-600 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 transition-colors duration-300 hover:border-slate-300 hover:text-white"
        >
          <Linkedin size={15} />
          LinkedIn
          <ArrowUpRight size={13} />
        </a>
        <a
          href={SITE.resume}
          target="_blank"
          rel="noreferrer"
          data-testid="contact-resume-button"
          className="inline-flex items-center gap-3 border border-slate-600 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 transition-colors duration-300 hover:border-slate-300 hover:text-white"
        >
          <Download size={15} />
          Résumé
        </a>
      </motion.div>

      <footer
        className="mt-24 flex flex-col gap-4 border-t border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between"
        data-testid="footer"
      >
        <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">
          © 2026 {SITE.name}
        </p>
        <p className="text-[11px] uppercase tracking-[0.25em] text-slate-600">
          NITK · CFA Level I · Financial Modeling &amp; Advisory
        </p>
      </footer>
    </div>
  </section>
);

export default Contact;
