"use client"

import { useState, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  
  // Motion values for smooth cursor movement
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  // Add spring physics for more natural movement
  const springConfig = { damping: 25, stiffness: 350 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Only use custom cursor on desktop devices
    if (window.matchMedia("(pointer: fine)").matches) {
      const moveCursor = (e: MouseEvent) => {
        cursorX.set(e.clientX)
        cursorY.set(e.clientY)
        
        // Show cursor once it's positioned
        if (!isVisible) {
          setIsVisible(true)
        }
        
        // Check if hovering over clickable elements
        const target = e.target as HTMLElement
        const isClickable = 
          target.tagName.toLowerCase() === "button" ||
          target.tagName.toLowerCase() === "a" ||
          target.tagName.toLowerCase() === "input" ||
          target.closest("button") !== null ||
          target.closest("a") !== null ||
          target.closest("input") !== null ||
          target.closest("[role=button]") !== null ||
          target.dataset.cursorPointer === "true"
          
        setIsPointer(isClickable)
      }
      
      const handleMouseDown = () => {
        setIsClicking(true)
      }
      
      const handleMouseUp = () => {
        setIsClicking(false)
      }

      // Hide cursor when leaving the window
      const handleMouseLeave = () => {
        setIsVisible(false)
      }
      
      // Add event listeners
      document.addEventListener("mousemove", moveCursor)
      document.addEventListener("mousedown", handleMouseDown)
      document.addEventListener("mouseup", handleMouseUp)
      document.addEventListener("mouseleave", handleMouseLeave)
      
      // Clean up
      return () => {
        document.removeEventListener("mousemove", moveCursor)
        document.removeEventListener("mousedown", handleMouseDown)
        document.removeEventListener("mouseup", handleMouseUp)
        document.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [cursorX, cursorY, isVisible])
  
  // Don't render on touch devices or when cursor isn't visible
  if (typeof window === "undefined" || !isVisible) {
    return null
  }
  
  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-[#BB2124] z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          scale: isClicking ? 0.7 : 1,
        }}
      />
      
      {/* Cursor outline */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full border z-[9998] pointer-events-none ${
          isPointer ? "border-[#BB2124] w-10 h-10" : "border-white w-8 h-8"
        }`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          scale: isClicking ? 0.7 : isPointer ? 1.2 : 1,
          opacity: 0.5,
        }}
        transition={{
          scale: { type: "spring", stiffness: 500, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      />
      
      {/* Glow effect */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 rounded-full bg-[#BB2124]/20 z-[9997] pointer-events-none blur-xl opacity-50"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          scale: isClicking ? 0.8 : isPointer ? 1.1 : 1,
        }}
      />
      
      {/* Apply global styles to hide native cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  )
}

