import { useEffect } from "react";
import Lenis from "lenis";
import "@/App.css";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EditorialMarquee from "@/components/EditorialMarquee";
import About from "@/components/About";
import Project from "@/components/Project";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    window.__lenis = lenis;
    let rafId;
    const loop = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <div className="App bg-[#F9FAF8] text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <EditorialMarquee />
        <About />
        <Project />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

export const scrollToSection = (href) => {
  const el = document.querySelector(href);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -64, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

export default App;
