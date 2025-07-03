'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';

const technologies = [
  { name: "React", icon: "ri-reactjs-line" },
  { name: "Next.js", icon: "ri-nextjs-line" },
  { name: "TypeScript", icon: "ri-javascript-line" },
  { name: "Node.js", icon: "ri-nodejs-line" },
  { name: "Python", icon: "ri-code-line" },
  { name: "Docker", icon: "ri-docker-line" },
  { name: "AWS", icon: "ri-cloud-line" },
  { name: "MongoDB", icon: "ri-database-2-line" },
  { name: "PostgreSQL", icon: "ri-database-line" },
  { name: "Git", icon: "ri-git-branch-line" },
  { name: "Figma", icon: "ri-palette-line" },
  { name: "Vercel", icon: "ri-rocket-line" }
];

const additionalSkills = [
  "GraphQL", "Redis", "Kubernetes", "Tailwind CSS", "Docker", 
  "FastAPI", "PostgreSQL", "Cypress", "Three.js", "WebGL", 
  "Framer Motion", "GSAP", "Svelte", "Vue.js", "Electron"
];

// Tech Card with Neon Glow Effect
const TechCard = ({ tech, index }: { tech: { name: string, icon: string }, index: number }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.div 
      ref={cardRef}
      className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 hover:border-green-400/50 transition-all duration-300 cursor-pointer group relative overflow-hidden"
      style={{ 
        animationDelay: `${index * 100}ms` 
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {isHovered && (
        <div 
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(74, 222, 128, 0.6) 0%, rgba(74, 222, 128, 0) 70%)',
            transform: 'translate(-50%, -50%)',
            opacity: isHovered ? 1 : 0,
            filter: 'blur(10px)',
            zIndex: 0
          }}
        />
      )}
      
      <div className="text-center relative z-10">
        <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4 text-3xl text-white/70 group-hover:text-green-400 transition-colors">
          <i className={tech.icon}></i>
        </div>
                 <h3 className="text-white font-pixel text-sm group-hover:text-green-400 transition-colors">
           {tech.name}
         </h3>
      </div>
    </motion.div>
  );
};

export default function TechStack() {
  return (
    <section id="tech" className="py-24 px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-6xl font-pixel text-green-400 mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Tech Stack
          </motion.h2>
          <motion.p 
            className="text-white/70 text-lg max-w-2xl mx-auto font-mono"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Technologies and tools I use to bring ideas to life
          </motion.p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {technologies.map((tech, index) => (
            <TechCard key={tech.name} tech={tech} index={index} />
          ))}
        </div>
        
        {/* Marquee Strip */}
        <div className="mt-20">
          <h3 className="text-2xl font-pixel text-white mb-8 text-center">Also Experienced With</h3>
          
          <div className="relative h-16 overflow-hidden">
            <Marquee
              gradient={false}
              speed={50}
              pauseOnHover={true}
              className="py-4"
            >
              <div className="flex space-x-8 px-4">
                {additionalSkills.map((skill) => (
                  <div 
                    key={skill}
                    className="px-6 py-2 text-green-400 whitespace-nowrap font-mono text-lg relative group"
                    style={{
                      textShadow: '0 0 5px rgba(74, 222, 128, 0.5)'
                    }}
                  >
                    <span>{skill}</span>
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-400 opacity-50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </div>
                ))}
              </div>
            </Marquee>
            
            {/* Gradient Overlays for Proximity Effect */}
            <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-zinc-950 to-transparent pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-zinc-950 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}