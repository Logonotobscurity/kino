import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "Private Space Reservation | Kinkosais",
  description: "Book our private, fully-equipped spaces for your personal exploration. Secure, discreet facilities with professional-grade equipment.",
  keywords: "private space booking, dungeon reservation, bdsm space rental, private play space, discreet venue",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Private Space Reservation | Kinkosais",
    description: "Book one of our private, fully-equipped spaces designed for personal exploration and enjoyment in a safe, discreet environment.",
    url: "https://kinkosais.com/reservation",
    siteName: "Kinkosais",
    locale: "en_US",
    type: "website",
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
} 