import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface SplitScreenSectionProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  buttonText: string
  buttonIcon?: ReactNode
  buttonLink: string
  imagePosition?: "left" | "right"
  className?: string
}

export function SplitScreenSection({
  title,
  description,
  imageSrc,
  imageAlt,
  buttonText,
  buttonIcon,
  buttonLink,
  imagePosition = "left",
  className,
}: SplitScreenSectionProps) {
  return (
    <section className={cn("py-16 bg-[#121212]", className)}>
      <div className="container mx-auto px-6">
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 gap-8 items-center",
            imagePosition === "right" ? "md:flex-row" : "md:flex-row-reverse",
          )}
        >
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: imagePosition === "right" ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={cn(
              "relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg",
              imagePosition === "right" ? "md:order-2" : "md:order-1",
            )}
          >
            <div className="absolute inset-0 bg-[#BB2124]/10 rounded-lg"></div>
            <Image src={imageSrc || "/placeholder.svg"} alt={imageAlt} fill className="object-cover rounded-lg" />
            <div className="absolute inset-0 bg-[#121212]/40"></div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: imagePosition === "right" ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={cn(
              "flex flex-col justify-center",
              imagePosition === "right" ? "md:order-1 md:pr-12" : "md:order-2 md:pl-12",
            )}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">{title}</span>
            </h2>
            <p className="text-gray-700 mb-8 font-medium">{description}</p>
            <motion.div whileHover={{ scale: 1.03 }} className="inline-block">
              <Link href={buttonLink}>
                <Button size="lg" className="bg-pink hover:bg-pink-dark text-white self-start shadow-md">
                  {buttonIcon}
                  {buttonText}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

