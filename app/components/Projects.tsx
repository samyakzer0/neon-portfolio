'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: "AI Analytics Dashboard",
    description: "Real-time data visualization platform with machine learning insights and predictive analytics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop",
    liveUrl: "https://example.com/project1",
    tags: ["React", "TypeScript", "D3.js"]
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "Full-stack shopping experience with advanced filtering, payment integration, and admin panel.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1470&auto=format&fit=crop",
    liveUrl: "https://example.com/project2",
    tags: ["Next.js", "Stripe", "MongoDB"]
  },
  {
    id: 3,
    title: "Creative Portfolio",
    description: "Interactive portfolio showcasing creative work with smooth animations and responsive design.",
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1480&auto=format&fit=crop",
    liveUrl: "https://example.com/project3",
    tags: ["Framer", "CSS", "GSAP"]
  },
  {
    id: 4,
    title: "Mobile App UI/UX",
    description: "Intuitive mobile application design with focus on user experience and accessibility.",
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?q=80&w=1470&auto=format&fit=crop",
    liveUrl: "https://example.com/project4",
    tags: ["Figma", "React Native", "UI/UX"]
  }
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-transition every 6 seconds
  useEffect(() => {
    const startAutoPlay = () => {
      if (isAutoPlaying) {
        autoPlayRef.current = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
        }, 6000);
      }
    };

    startAutoPlay();

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying]);

  // Reset autoplay when manually changing slides
  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      if (isAutoPlaying) {
        autoPlayRef.current = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
        }, 6000);
      }
    }
  };

  // Handle drag interactions
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
    
    // Pause autoplay during dragging
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offset = clientX - dragStartX;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Determine if we should navigate to the next or previous slide
    if (Math.abs(dragOffset) > 100) {
      if (dragOffset > 0) {
        // Dragged right - go to previous
        setCurrentIndex((prevIndex) => 
          prevIndex === 0 ? projects.length - 1 : prevIndex - 1
        );
      } else {
        // Dragged left - go to next
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
      }
    }
    
    setDragOffset(0);
    setIsAutoPlaying(true);
    resetAutoPlay();
  };

  // Handle manual scrolling
  const handleScroll = () => {
    if (!scrollRef.current) return;
    
    // Pause autoplay during scrolling
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    
    // Calculate which slide is most visible
    const scrollLeft = scrollRef.current.scrollLeft;
    const slideWidth = scrollRef.current.clientWidth;
    const newIndex = Math.round(scrollLeft / slideWidth);
    
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
    
    // Resume autoplay after scrolling stops
    const resumeAutoPlay = setTimeout(() => {
      setIsAutoPlaying(true);
      resetAutoPlay();
    }, 1000);
    
    return () => clearTimeout(resumeAutoPlay);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * scrollRef.current.clientWidth,
        behavior: 'smooth'
      });
    }
    setIsAutoPlaying(true);
    resetAutoPlay();
  };

  return (
    <section id="projects" className="py-24 px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-pixel text-green-400 mb-16 tracking-wider">
          Selected Projects
        </h2>
        
        <div 
          ref={carouselRef}
          className="relative overflow-hidden"
        >
          <div 
            ref={scrollRef}
            className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide"
            style={{ 
              scrollBehavior: 'smooth',
              scrollSnapType: 'x mandatory',
            }}
            onScroll={handleScroll}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
        >
            {projects.map((project) => (
            <div 
              key={project.id}
                className="w-full flex-none snap-center px-4"
                style={{ scrollSnapAlign: 'center' }}
              >
                <motion.div 
                  className="bg-zinc-900 rounded-2xl overflow-hidden cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.5 }}
            >
                  <div className="h-64 md:h-80 bg-zinc-800 relative overflow-hidden">
                <img 
                      src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              <div className="p-8">
                    <h3 className="text-2xl font-pixel text-white mb-4">
                  {project.title}
                </h3>
                <p className="text-white/70 mb-6 leading-relaxed font-mono">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                          className="px-3 py-1 bg-zinc-800 text-white/80 rounded-full text-sm font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-green-400 hover:text-green-300 transition-colors cursor-pointer whitespace-nowrap font-pixel text-sm flex items-center gap-2 group"
                    >
                      View Live Project 
                      <i className="ri-external-link-line text-sm group-hover:translate-x-1 transition-transform"></i>
                    </a>
                  </div>
                </motion.div>
              </div>
            ))}
            </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center mt-8 gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-none transition-all duration-300 ${
                  index === currentIndex ? 'bg-green-400 w-8' : 'bg-zinc-700'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Navigation arrows */}
          <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center pointer-events-none z-10 px-4 md:px-8">
            <button 
              className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-green-400/90 hover:text-black transition-colors border border-zinc-700 pointer-events-auto transform -translate-y-1/2"
              onClick={() => {
                setCurrentIndex((prevIndex) => prevIndex === 0 ? projects.length - 1 : prevIndex - 1);
                goToSlide(currentIndex === 0 ? projects.length - 1 : currentIndex - 1);
              }}
              aria-label="Previous project"
            >
              <i className="ri-arrow-left-s-line text-2xl"></i>
            </button>
            
            <button 
              className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-green-400/90 hover:text-black transition-colors border border-zinc-700 pointer-events-auto transform -translate-y-1/2"
              onClick={() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
                goToSlide((currentIndex + 1) % projects.length);
              }}
              aria-label="Next project"
            >
              <i className="ri-arrow-right-s-line text-2xl"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}