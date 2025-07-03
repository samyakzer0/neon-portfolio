'use client';

import { motion, Variants } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We begin with a deep dive into your vision, goals, and requirements. This collaborative phase helps me understand exactly what you need and how to exceed your expectations.'
  },
  {
    number: '02',
    title: 'Design & Development',
    description: 'Transforming concepts into reality through modern technologies and creative solutions. Every line of code is crafted with performance, scalability, and user experience in mind.'
  },
  {
    number: '03',
    title: 'Deployment & Support',
    description: 'Your project goes live with comprehensive testing and optimization. I provide ongoing support to ensure everything runs smoothly and stays up-to-date with evolving technologies.'
  }
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  const fadeInUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <section id="process" className="py-24 bg-zinc-950" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-pixel text-green-400 mb-6">My Process</h2>
          <p className="text-xl text-white/70 max-w-2xl font-mono">
            A systematic approach to bringing your ideas to life through thoughtful planning and execution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUpVariants}
              className="relative"
            >
              <div className="mb-6">
                <div className="text-8xl md:text-9xl font-pixel text-green-400/20 leading-none">
                  {step.number}
                </div>
                <h3 className="text-2xl md:text-3xl font-pixel text-white mt-4">
                  {step.title}
                </h3>
              </div>
              <div className="h-px w-16 bg-green-400/50 mb-6"></div>
              <p className="text-white/70 leading-relaxed font-mono">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 