'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

// Particle Effect Component
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }[] = [];
    
    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: `rgba(74, 222, 128, ${Math.random() * 0.5 + 0.1})`
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

// Animated Form Input
const AnimatedInput = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  required = false,
  placeholder,
  rows
}: { 
  label: string; 
  name: string; 
  type?: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; 
  required?: boolean;
  placeholder?: string;
  rows?: number;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const InputComponent = rows ? 'textarea' : 'input';
  
  return (
    <div className="relative">
      <label htmlFor={name} className="block text-white mb-2 font-mono">
        {label}
      </label>
      <motion.div
        className="relative"
        whileTap={{ scale: 0.995 }}
      >
        <InputComponent
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm transition-all duration-300 font-mono"
          style={{
            boxShadow: isFocused ? '0 0 0 2px rgba(74, 222, 128, 0.3)' : 'none',
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <motion.div 
          className="absolute bottom-0 left-0 h-0.5 bg-green-400"
          initial={{ width: '0%' }}
          animate={{ width: isFocused ? '100%' : '0%' }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  );
};

// Kinetic Typography Component
const KineticText = ({ text, className }: { text: string, className?: string }) => {
  const letters = Array.from(text);
  
  return (
    <div className={`flex ${className}`}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ y: 0 }}
          whileInView={{ 
            y: [0, letter !== ' ' ? -5 : 0, 0],
            scale: [1, letter !== ' ' ? 1.1 : 1, 1],
          }}
          transition={{ 
            duration: 1.5,
            delay: index * 0.05,
            repeat: Infinity,
            repeatDelay: 3
          }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  );
};

// Animated Button Border
const AnimatedButton = ({ children, type = 'button', disabled = false, className = '' }: { 
  children: React.ReactNode; 
  type?: 'button' | 'submit' | 'reset'; 
  disabled?: boolean;
  className?: string;
}) => {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={`relative overflow-hidden ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="relative z-10">{children}</span>
      <motion.div 
        className="absolute inset-0 bg-green-400"
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: [1, 0.8, 1],
          scale: [1, 1.03, 1]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute inset-0 border-2 border-green-300 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.5, 0],
          scale: [1, 1.1, 1.2],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeOut"
        }}
      />
    </motion.button>
  );
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 px-8 lg:px-16 relative overflow-hidden">
      <ParticleBackground />
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div 
          ref={ref}
          className="text-center mb-16"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.8, ease: "easeOut" }
            }
          }}
        >
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-pixel text-green-400 mb-6">
            Ready to Build Something Incredible?
          </h2>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-24"
          >
            <div className="space-y-6 text-white/80 text-lg leading-relaxed mb-12 font-mono">
              <p className="break-words">
                Have a project in mind? I'd love to hear about it. Whether you need 
                a complete web application, want to discuss a collaboration, or just 
                want to say hello, feel free to reach out.
              </p>
            </div>
            
            <div className="space-y-8">
              <motion.div 
                className="flex items-center gap-4"
                whileHover={{ x: 5 }}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-zinc-900 rounded-full">
                  <i className="ri-mail-line text-green-400 text-xl"></i>
                </div>
                <div>
                  <div className="text-white font-pixel text-sm">Email</div>
                  <div className="text-white/70 font-mono break-all">hello@utkarsh.dev</div>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-4"
                whileHover={{ x: 5 }}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-zinc-900 rounded-full">
                  <i className="ri-map-pin-line text-green-400 text-xl"></i>
                </div>
                <div>
                  <div className="text-white font-pixel text-sm">Location</div>
                  <div className="text-white/70 font-mono">San Francisco, CA</div>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-4"
                whileHover={{ x: 5 }}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-zinc-900 rounded-full">
                  <i className="ri-time-line text-green-400 text-xl"></i>
                </div>
                <div>
                  <div className="text-white font-pixel text-sm">Response Time</div>
                  <div className="text-white/70 font-mono">Within 24 hours</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-zinc-900/80 backdrop-blur-sm p-8 rounded-2xl border border-zinc-800 relative z-10"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {isSubmitted ? (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="w-16 h-16 flex items-center justify-center bg-green-400 text-black rounded-full mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.5, times: [0, 0.7, 1] }}
                >
                  <i className="ri-check-line text-2xl"></i>
                </motion.div>
                <h3 className="text-2xl text-white mb-4 font-pixel">Message Sent!</h3>
                <p className="text-white/70 font-mono">Thanks for reaching out. I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatedInput
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
                
                <AnimatedInput
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
                
                <AnimatedInput
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell me about your project..."
                />
                
                <AnimatedButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-400 text-black py-4 rounded-lg font-mono hover:bg-green-300 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                      Sending...
                    </span>
                  ) : (
                    <span className="relative group">
                      Let's Collaborate
                      <span className="absolute -inset-x-full bottom-0 h-px bg-black/30 group-hover:animate-shine"></span>
                    </span>
                  )}
                </AnimatedButton>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}