import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "Classes & Events | Kinkosais",
  description: "Expand your knowledge through our educational workshops, demonstrations, and community events. Browse our calendar and reserve your spot today.",
  keywords: "sensual education, workshops, intimate classes, sensory play, adult education, community events",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Classes & Events | Kinkosais",
    description: "Join our expert-led workshops and community events designed to enhance your knowledge and connect with like-minded individuals.",
    url: "https://kinkosais.com/classes",
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