import "./globals.css"
import { Metadata } from "next"
import ClientLayout from "./client-layout"
import Script from "next/script"

// Export viewport config separately to fix the warnings
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  title: "Kinkosais | Premium Lifestyle",
  description: "Explore our curated collection of premium lifestyle products designed to enhance your daily routine and well-being.",
  keywords: "premium lifestyle, hoodies, fashion, quality products, curated collection",
  generator: 'Next.js',
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL('https://kinkosais.com'),
  other: {
    'cache-control': 'public, max-age=31536000, immutable',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">
        <ClientLayout>
          {children}
        </ClientLayout>
        <Script id="performance-optimizations" strategy="afterInteractive">
          {`
            // Prefetch critical pages
            const prefetchUrls = ['/shop', '/checkout', '/contact', '/reservation', '/classes'];
            if ('connection' in navigator && navigator.connection.saveData === false) {
              prefetchUrls.forEach(url => {
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = url;
                link.as = 'document';
                document.head.appendChild(link);
              });
            }
            
            // Optimize image loading
            if ('loading' in HTMLImageElement.prototype) {
              document.querySelectorAll('img').forEach(img => {
                if (img.dataset.src) {
                  img.src = img.dataset.src;
                  delete img.dataset.src;
                }
              });
            }
          `}
        </Script>
      </body>
    </html>
  )
}