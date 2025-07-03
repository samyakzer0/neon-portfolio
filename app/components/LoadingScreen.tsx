'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DecryptedText from './DecryptedText';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [textRevealed, setTextRevealed] = useState(false);
  const loadingDuration = 5000; // 5 seconds

  useEffect(() => {
    // Start text reveal animation immediately
    setTimeout(() => {
      setTextRevealed(true);
    }, 100);

    // End loading after loadingDuration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingDuration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          initial={{ clipPath: 'circle(100% at center)' }}
          exit={{
            clipPath: 'circle(0% at center)',
            transition: {
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          <div className="text-center">
            {textRevealed ? (
              <DecryptedText
                text="LOADING"
                animateOn="view"
                sequential={true}
                speed={600}
                maxIterations={15}
                revealDirection="start"
                className="text-green-400"
                encryptedClassName="text-green-400/30"
                parentClassName="font-pixel text-6xl md:text-8xl tracking-wider"
                continueAnimating={false}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()"
                useOriginalCharsOnly={false}
              />
            ) : (
              <div className="font-pixel text-6xl md:text-8xl tracking-wider text-green-400/30">
                LOADING
              </div>
            )}
            <motion.div
              className="h-1 bg-green-400/20 mt-8 mx-auto max-w-xs"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{
                duration: loadingDuration / 1000 - 0.5,
                ease: 'linear',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 