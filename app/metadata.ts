import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "Kinkosais | Premium Lifestyle",
  description: "Explore our curated collection of premium lifestyle products designed to enhance your daily routine and well-being.",
  keywords: "premium lifestyle, hoodies, fashion, quality products, curated collection",
  generator: 'Next.js',
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
} 