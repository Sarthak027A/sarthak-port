import Navbar from "@/components/Navbar";
import ScrollCube from "@/components/ScrollCube";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Project from "@/components/Project";
import Pipeline from "@/components/Pipeline";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import { FileGateProvider } from "@/components/files/FileGate";

function App() {
  return (
    <FileGateProvider>
      <div className="min-h-screen bg-black text-[var(--bone)]">
        <Navbar />
        <ScrollCube />
        <main>
          <Hero />
          <About />
          <Project />
          <Pipeline />
          <Skills />
          <Contact />
        </main>
      </div>
    </FileGateProvider>
  );
}

export default App;
