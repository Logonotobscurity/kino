"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing")
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; opacity: number }[]>([])
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Create random particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 1,
      opacity: Math.random() * 0.5 + 0.2
    }))
    setParticles(newParticles)

    // Loading text animation
    const loadingTexts = [
      "Initializing",
      "Loading Assets",
      "Preparing Collection",
      "Setting Up Environment",
      "Almost Ready"
    ]
    
    let textIndex = 0
    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % loadingTexts.length
      setLoadingText(loadingTexts[textIndex])
    }, 1500)

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 3 + 1
        const newProgress = Math.min(prev + increment, 100)
        
        if (newProgress >= 100) {
          clearInterval(progressInterval)
          clearInterval(textInterval)
          
          // Delay transition out
          setTimeout(() => {
            setIsComplete(true)
            // Call onComplete after animation finishes
            setTimeout(onComplete, 800)
          }, 500)
          
          return 100
        }
        return newProgress
      })
    }, 80)

    return () => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#0A0A0A] overflow-hidden"
        >
          {/* Background particles */}
          {particles.map(particle => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-[#BB2124]"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity
              }}
              animate={{
                x: [0, Math.random() * 20 - 10],
                y: [0, Math.random() * 20 - 10],
                opacity: [particle.opacity, particle.opacity / 2, particle.opacity]
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: Math.random() * 5 + 5
              }}
            />
          ))}
          
          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo container with glow effect */}
            <motion.div 
              className="relative w-40 h-40 mb-10 flex items-center justify-center"
              animate={{ 
                scale: [0.95, 1.05, 0.95],
                rotateZ: [0, 1, 0, -1, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 5,
                ease: "easeInOut"
              }}
            >
              {/* Glow effect */}
              <div className="absolute w-full h-full rounded-full bg-[#BB2124]/20 blur-xl transform scale-75" />
              
              {/* Logo */}
              <motion.div
                className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-[#BB2124]/30 bg-[#121212]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >
                <div className="absolute inset-0 z-10 rounded-full bg-[#121212]/40"></div>
                <video
                  src="/hero/Hero-side.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover w-full h-full"
                />
              </motion.div>
              
              {/* Orbiting dot */}
              <motion.div
                className="absolute w-3 h-3 rounded-full bg-[#BB2124]"
                animate={{
                  rotateZ: [0, 360],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "linear"
                }}
                style={{
                  rotate: 0,
                  transformOrigin: "50% 50%",
                  left: "calc(50% - 3px)",
                  top: "-5px"
                }}
              />
            </motion.div>

            {/* Brand name */}
            <motion.h1 
              className="text-2xl md:text-3xl font-bold text-white mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="text-[#BB2124]">Kink</span>oasis
            </motion.h1>

            {/* Loading text with typing effect */}
            <motion.div 
              className="h-6 font-mono text-[#999] mb-3 min-w-[200px] text-center"
              key={loadingText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {loadingText}...
            </motion.div>

            {/* Progress bar with animated gradient */}
            <div className="w-64 h-1.5 mb-3 relative overflow-hidden rounded-full bg-[#222]">
              <motion.div 
                className="absolute top-0 left-0 h-full rounded-full"
                style={{ 
                  width: `${progress}%`,
                  background: "linear-gradient(to right, #BB2124, #F03A3E)"
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 0%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "linear"
                }}
        />
      </div>

            {/* Progress percentage with counter animation */}
            <motion.div 
              className="font-mono text-white text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {Math.round(progress)}%
            </motion.div>
      </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

