import { ArrowUpRight, Linkedin, Mail, Phone } from "lucide-react";
import { SITE } from "@/config/site";
import Reveal from "@/components/Reveal";
import { useFileGate } from "@/components/files/FileGate";

const Contact = () => {
  const openFile = useFileGate();

  return (
    <section id="contact" className="border-t border-[var(--hairline)] px-4 pt-24 sm:px-6" data-testid="contact-section">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="font-display mt-6 text-[48px] leading-none text-[var(--white)] sm:text-[77px]">Let&rsquo;s build something.</h2>
          <p className="mt-6 max-w-xl text-base leading-[1.6] text-[var(--ash)] sm:text-lg">
            Open to roles and mandates across financial modeling, valuation, M&amp;A and business
            development — from building the model to building the pipeline.
          </p>
        </Reveal>

        <Reveal delay={80} className="card mt-12 p-6 sm:p-8" data-testid="contact-actions">
          <p className="font-mono text-xs text-[var(--iron)]">to:</p>
          <a
            href={`mailto:${SITE.email}`}
            className="focus-ring mt-2 inline-block break-all rounded font-mono text-base text-[var(--iris)] transition-colors duration-150 hover:text-[var(--iris-glow)] sm:text-xl"
            data-testid="contact-email-button"
          >
            {SITE.email}
          </a>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${SITE.email}`} className="btn-ghost">
              <Mail size={15} strokeWidth={1.5} /> Email
            </a>
            <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="btn-ghost" data-testid="contact-phone-button">
              <Phone size={15} strokeWidth={1.5} /> {SITE.phone}
            </a>
            <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="btn-ghost" data-testid="contact-linkedin-button">
              <Linkedin size={15} strokeWidth={1.5} /> LinkedIn <ArrowUpRight size={14} strokeWidth={1.5} />
            </a>
            <button onClick={() => openFile(SITE.resumeFile)} className="btn-ghost" data-testid="contact-resume-button">
              Résumé
            </button>
          </div>
        </Reveal>

        <footer className="mt-24 flex flex-col gap-2 border-t border-[var(--hairline)] py-8 text-sm text-[var(--ash)] sm:flex-row sm:justify-between" data-testid="footer">
          <p>© {new Date().getFullYear()} {SITE.name}</p>
          <p>NITK · CFA Level I</p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
