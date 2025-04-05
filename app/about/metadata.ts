import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "About Kinkosais | Our Story & Values",
  description: "Learn about Kinkosais' commitment to quality, discretion, and education in intimate products since 2015.",
  keywords: "premium intimate products, discreet shopping, sex education, quality adult products, ethical company, about kinkosais",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "About Kinkosais | Our Story & Values",
    description: "Discover the story behind Kinkosais, our mission, values, and the team dedicated to providing premium intimate products.",
    url: "https://kinkosais.com/about",
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