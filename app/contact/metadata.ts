import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "Contact Us | Kinkosais",
  description: "Get in touch with our team for product inquiries, event registration, or any questions about our services. We're here to help in a respectful and confidential manner.",
  keywords: "contact kinkosais, intimate products customer service, discreet customer support, private inquiry, adult product questions",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Contact Us | Kinkosais",
    description: "Reach out to our team for product information, assistance with orders, or event registration. Your privacy is our priority.",
    url: "https://kinkosais.com/contact",
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