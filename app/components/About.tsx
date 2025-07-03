'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Text3D, OrbitControls } from '@react-three/drei';

// 3D Text Cube Component
function TextCube() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <group rotation={[0, Math.PI / 4, 0]}>
        <Text3D
          font="/fonts/Inter_Bold.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          position={[-2.5, 0, 0]}
        >
          CREATIVE
          <meshStandardMaterial color="#4ade80" />
        </Text3D>
        <Text3D
          font="/fonts/Inter_Bold.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          position={[0, 0, -2.5]}
          rotation={[0, Math.PI / 2, 0]}
        >
          PRECISE
          <meshStandardMaterial color="#4ade80" />
        </Text3D>
        <Text3D
          font="/fonts/Inter_Bold.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          position={[0, 0, 2.5]}
          rotation={[0, -Math.PI / 2, 0]}
        >
          SKILLED
          <meshStandardMaterial color="#4ade80" />
        </Text3D>
        <Text3D
          font="/fonts/Inter_Bold.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          position={[2.5, 0, 0]}
          rotation={[0, Math.PI, 0]}
        >
          FOCUSED
          <meshStandardMaterial color="#4ade80" />
        </Text3D>
      </group>
    </>
  );
}

// SVG Blob Background
const BlobBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
      <svg 
        viewBox="0 0 800 800" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full"
      >
        <motion.path
          fill="#4ade80"
          initial={{ 
            d: "M431,304.5Q400,359,359,400Q318,441,250,445.5Q182,450,116,400Q50,350,50,250Q50,150,116,100Q182,50,250,50Q318,50,359,100Q400,150,431,200Q462,250,431,304.5Z" 
          }}
          animate={{ 
            d: [
              "M431,304.5Q400,359,359,400Q318,441,250,445.5Q182,450,116,400Q50,350,50,250Q50,150,116,100Q182,50,250,50Q318,50,359,100Q400,150,431,200Q462,250,431,304.5Z",
              "M419,309Q400,368,359,419Q318,470,250,470Q182,470,116,419Q50,368,50,250Q50,132,116,81Q182,30,250,30Q318,30,359,81Q400,132,419.5,191Q439,250,419,309Z",
              "M431,304.5Q400,359,359,400Q318,441,250,445.5Q182,450,116,400Q50,350,50,250Q50,150,116,100Q182,50,250,50Q318,50,359,100Q400,150,431,200Q462,250,431,304.5Z"
            ]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </svg>
    </div>
  );
};

// Subtle Highlight Text
const HighlightText = ({ text, className }: { text: string, className?: string }) => {
  return (
    <span className={`text-green-400 font-pixel ${className}`}>{text}</span>
  );
};

export default function About() {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-24 px-8 lg:px-16 relative overflow-hidden">
      <BlobBackground />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column - Text Content */}
          <motion.div 
            ref={ref}
            className="lg:col-span-7 lg:pr-16"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.8, ease: "easeOut" }
              }
            }}
          >
            <div className="mb-12">
              <h2 className="text-4xl md:text-6xl font-pixel text-green-400 mb-4">
                About <HighlightText text="Me" />
              </h2>
              <div className="h-1 w-32 bg-green-400"></div>
            </div>
            
            <div className="space-y-8 text-white/90 text-lg font-mono leading-relaxed">
              <div className="flex flex-col space-y-2">
                <p className="pl-4 border-l border-green-400/30">
                  I'm Utkarsh, a passionate full-stack developer with over 5 years of experience creating 
                  digital solutions that bridge the gap between design and functionality.
                </p>
              </div>
            </div>
            
            <div className="mt-12">
              <motion.button 
                onClick={scrollToContact}
                className="bg-green-400 text-black px-8 py-4 rounded-none font-pixel hover:bg-green-300 transition-colors cursor-pointer whitespace-nowrap relative group overflow-hidden glow-on-click"
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(74, 222, 128, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Let's Talk</span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                <span className="absolute -inset-x-full bottom-0 h-px bg-black/30 group-hover:animate-shine"></span>
              </motion.button>
            </div>
          </motion.div>
          
          {/* Right Column - Image and 3D Element */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.8, delay: 0.2, ease: "easeOut" }
              }
            }}
          >
            {/* Image Container */}
            <div className="mb-16 relative">
              <div className="aspect-square rounded-none overflow-hidden bg-zinc-900 shadow-xl border-2 border-green-400/20">
                <img 
                  src="https://readdy.ai/api/search-image?query=professional%20developer%20portrait%2C%20confident%20young%20programmer%20in%20casual%20attire%2C%20modern%20office%20environment%2C%20natural%20lighting%2C%20contemporary%20workspace%20background%2C%20clean%20aesthetic%2C%20professional%20headshot%20for%20portfolio&width=500&height=500&seq=about-portrait-001&orientation=squarish"
                  alt="Utkarsh - Developer Portrait"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            
              {/* Floating Stats */}
              <motion.div 
                className="absolute -top-4 -right-4 bg-green-400 text-black p-4 rounded-none font-pixel"
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <div className="text-2xl font-bold">50+</div>
                <div className="text-xs">Projects</div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-4 -left-4 bg-zinc-900 p-4 rounded-none border border-green-400/30 font-pixel"
                animate={{ 
                  y: [0, 5, 0],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <div className="text-2xl font-bold text-green-400">5+</div>
                <div className="text-xs text-white/70">Years</div>
              </motion.div>
            </div>
            
            {/* 3D Rotating Element */}
            <div className="h-64">
              <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
                <TextCube />
              </Canvas>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}