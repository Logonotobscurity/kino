"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

interface MotionBackgroundProps {
  particleCount?: number
  colorVariant?: "pink" | "mixed"
}

export function MotionBackground({ particleCount = 50, colorVariant = "pink" }: MotionBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full window size
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Create particles
    const createParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < particleCount; i++) {
        const colors =
          colorVariant === "pink"
            ? ["rgba(255, 105, 180, ", "rgba(216, 78, 156, ", "rgba(255, 158, 201, "]
            : ["rgba(255, 105, 180, ", "rgba(216, 78, 156, ", "rgba(255, 158, 201, ", "rgba(192, 192, 192, "]

        const color = colors[Math.floor(Math.random() * colors.length)]
        const opacity = Math.random() * 0.2 + 0.1 // Between 0.1 and 0.3

        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 5 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity,
          color: `${color}${opacity})`,
        })
      }
    }

    createParticles()

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [particleCount, colorVariant])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]" />
}

