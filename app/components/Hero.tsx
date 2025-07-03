'use client';

import { useState } from 'react';

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20minimalist%20dark%20workspace%20setup%20with%20coding%20environment%2C%20clean%20desk%20with%20multiple%20monitors%20displaying%20code%2C%20ambient%20lighting%20with%20subtle%20green%20glow%2C%20professional%20tech%20atmosphere%2C%20high%20contrast%20black%20background%2C%20contemporary%20developer%20workspace%20aesthetic&width=1920&height=1080&seq=hero-bg-001&orientation=landscape')`
        }}
      >
        <div className="absolute inset-0 bg-zinc-950/80"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 right-0 z-50 p-8">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-12 h-12 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform rounded-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 group"
          aria-label="Toggle menu"
        >
          <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-2xl text-white group-hover:text-green-400 transition-colors ${isMenuOpen ? 'text-green-400' : ''}`}></i>
        </button>
        
        {isMenuOpen && (
          <div className="absolute top-20 right-0 bg-zinc-900/80 backdrop-blur-lg rounded-lg p-8 min-w-60 border border-zinc-800/50 shadow-xl shadow-green-400/5">
            <div className="flex flex-col gap-6">
              <button onClick={() => scrollToSection('projects')} className="text-white hover:text-green-400 transition-colors cursor-pointer text-left font-pixel text-lg">Projects</button>
              <button onClick={() => scrollToSection('about')} className="text-white hover:text-green-400 transition-colors cursor-pointer text-left font-pixel text-lg">About</button>
              <button onClick={() => scrollToSection('tech')} className="text-white hover:text-green-400 transition-colors cursor-pointer text-left font-pixel text-lg">Tech Stack</button>
              <button onClick={() => scrollToSection('contact')} className="text-white hover:text-green-400 transition-colors cursor-pointer text-left font-pixel text-lg">Contact</button>
            </div>
          </div>
        )}
      </nav>

      {/* Content */}
      <div className="relative z-10 w-full px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <div className="mb-6">
            <h1 className="font-pixel text-green-400 text-5xl md:text-7xl leading-none tracking-wide">
              UTKARSH
          </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/90 font-mono max-w-2xl leading-relaxed">
            Full-stack developer crafting exceptional digital experiences with modern technologies and creative solutions.
          </p>
          <div className="mt-12">
            <button 
              onClick={() => scrollToSection('projects')}
              className="bg-green-400 text-black px-8 py-4 rounded-none font-pixel hover:bg-green-300 transition-colors cursor-pointer whitespace-nowrap relative group overflow-hidden"
            >
              <span className="relative z-10">View My Work</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              <span className="absolute -inset-x-full bottom-0 h-px bg-white/50 group-hover:animate-shine"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}