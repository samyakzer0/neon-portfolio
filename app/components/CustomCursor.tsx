'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // Default to true to prevent flicker on mobile

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const isTouchDevice = 
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isTouchDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if cursor is over a clickable element
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' || 
        target.closest('button') !== null || 
        target.closest('a') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(isClickable);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Only add event listeners if not on mobile
    if (!isMobile) {
      document.addEventListener('mousemove', updatePosition);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseenter', handleMouseEnter);
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile]);

  // Don't render anything on mobile or server-side
  if (isMobile || typeof window === 'undefined') return null;

  return (
    <>
      <style jsx global>{`
        body {
          cursor: none;
        }
        
        a, button, [role="button"], [class*="cursor-pointer"] {
          cursor: none !important;
        }
      `}</style>
      
      {/* Outer cursor ring */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full mix-blend-difference"
        animate={{
          x: position.x - 24,
          y: position.y - 24,
          scale: isClicked ? 0.8 : isPointer ? 1.5 : 1,
          opacity: isVisible ? 1 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1
        }}
        style={{
          width: '48px',
          height: '48px',
          border: '2px solid rgba(74, 222, 128, 0.7)',
          boxShadow: '0 0 10px rgba(74, 222, 128, 0.5)',
        }}
      />
      
      {/* Inner cursor dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full bg-green-400"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isClicked ? 1.2 : isPointer ? 0.5 : 1,
          opacity: isVisible ? 1 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 10,
          mass: 0.05
        }}
        style={{
          width: '8px',
          height: '8px',
          boxShadow: '0 0 10px rgba(74, 222, 128, 0.8)',
        }}
      />
    </>
  );
} 
