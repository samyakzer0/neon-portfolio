'use client';

import Hero from './components/Hero';
import Projects from './components/Projects';
import Process from './components/Process';
import About from './components/About';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NeonDivider from './components/NeonDivider';
import LoadingScreen from './components/LoadingScreen';

const SectionDivider = () => (
  <div className="py-12">
    <div className="max-w-7xl mx-auto px-8 lg:px-16">
      <NeonDivider height={3} variant="glare" />
    </div>
  </div>
);

export default function Home() {
  return (
    <div className="bg-zinc-950 text-white">
      <LoadingScreen />
      
      <Hero />
      <SectionDivider />

      <Projects />
      <SectionDivider />

      <Process />
      <SectionDivider />

      <About />
      <SectionDivider />

      <TechStack />
      <SectionDivider />

      <Contact />
      
      <Footer />
    </div>
  );
}
