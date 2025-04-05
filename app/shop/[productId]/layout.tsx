import { sampleProducts } from './data'

export function generateStaticParams() {
  return sampleProducts.map((product) => ({
    productId: product.id,
  }))
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
} 