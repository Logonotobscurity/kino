import { Product } from "@/components/product-grid"

// Sample products data - normally would be fetched from an API
export const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Premium Leather Restraints",
    description: "Handcrafted leather restraints with reinforced stitching and secure locking mechanisms.",
    price: 129.99,
    image: "/placeholder.svg?height=400&width=600",
    category: "restraints"
  },
  {
    id: "2",
    name: "Adjustable St. Andrew's Cross",
    description: "Fully adjustable professional-grade cross with padded restraint points and stable base.",
    price: 799.99,
    image: "/placeholder.svg?height=400&width=600",
    category: "furniture"
  },
  {
    id: "3",
    name: "Dungeon Starter Kit",
    description: "Complete starter package with essential equipment for setting up your first play space.",
    price: 349.99,
    image: "/placeholder.svg?height=400&width=600",
    category: "kits"
  },
  {
    id: "4",
    name: "Impact Play Collection",
    description: "Set of premium impact toys including paddles, floggers, and crops of varying intensities.",
    price: 199.99,
    image: "/placeholder.svg?height=400&width=600",
    category: "impact"
  },
  {
    id: "5",
    name: "Suspension Rigging Kit",
    description: "Professional-grade suspension equipment with safety-rated hardware and detailed guide.",
    price: 249.99,
    image: "/placeholder.svg?height=400&width=600",
    category: "rope"
  },
  {
    id: "6",
    name: "Sensory Deprivation Hood",
    description: "Premium leather hood with removable blindfold and gag components for customizable play.",
    price: 89.99,
    image: "/placeholder.svg?height=400&width=600",
    category: "sensory"
  },
  {
    id: "7",
    name: "Deluxe Spanking Paddle",
    description: "Ergonomic leather paddle designed for precision and comfort during extended play sessions.",
    price: 69.99,
    image: "/placeholder.svg?height=400&width=600",
    category: "impact"
  },
  {
    id: "8",
    name: "Premium Bondage Rope Set",
    description: "Set of 3 professional-grade ropes in varying lengths, perfect for intricate ties and harnesses.",
    price: 45.99,
    image: "/placeholder.svg?height=400&width=600",
    category: "rope"
  }
]

// Extended product details
export const productExtras = {
  "1": {
    longDescription: "Our Premium Leather Restraints are handcrafted with high-quality leather and reinforced stitching for durability and security. Designed for comfort during extended sessions with padded interior and adjustable buckles.",
    materials: "Genuine leather, steel hardware",
    features: "Reinforced stitching, padded interior, adjustable size",
    directions: "Always check for proper circulation and never leave restrained person unattended."
  },
  "2": {
    longDescription: "The Adjustable St. Andrew's Cross is a professional-grade piece of dungeon furniture, perfect for restraint play and impact scenes. Fully adjustable to accommodate different heights and body types.",
    materials: "Steel frame, real wood panels, high-density padding",
    features: "Height adjustable, removable padding, multiple attachment points",
    directions: "Requires assembly. Always ensure frame is properly secured before use."
  },
  "3": {
    longDescription: "Our Dungeon Starter Kit contains everything you need to begin your BDSM journey, with carefully selected items for beginners to intermediate players.",
    contents: "Rope (30ft), padded cuffs, blindfold, small flogger, feather teaser",
    features: "Beginner-friendly, quality materials, detailed instruction guide",
    directions: "Read the included safety manual completely before use. Start slow and communicate clearly."
  },
  "4": {
    longDescription: "The Impact Play Collection features a variety of premium tools for sensation play, from gentle to intense. Each item is crafted for precision control and maximum sensation.",
    contents: "Leather paddle, suede flogger, riding crop, rubber slapper",
    features: "Graduated intensity options, ergonomic handles, balanced weight",
    directions: "Always practice on a pillow before using on a partner. Avoid kidneys and joints."
  },
  "5": {
    longDescription: "Our Suspension Rigging Kit provides professional-grade equipment for aerial bondage with an emphasis on safety and security.",
    contents: "Safety-rated hardware, 4 suspension ropes (30ft each), carabiners, rigging plates",
    features: "Weight tested components, detailed safety manual, storage case",
    directions: "Extensive training recommended before attempting suspension. Always use proper hardpoints."
  },
  "6": {
    longDescription: "The Sensory Deprivation Hood offers adjustable levels of sensory restriction with modular components for customized experiences.",
    materials: "Premium leather, breathable construction, padded blindfold",
    features: "Removable blindfold, optional mouth panel, breathable design",
    directions: "Always establish non-verbal safe signals when using. Never leave wearer unattended."
  },
  "7": {
    longDescription: "Our Deluxe Spanking Paddle delivers the perfect balance of sting and thud. Ergonomically designed handle reduces wrist fatigue during extended play.",
    materials: "Polished hardwood with leather covering",
    features: "Dual surfaces (soft and firm), balanced weight, ergonomic grip",
    directions: "Start gently and build intensity. Avoid bony areas and focus on padded areas."
  },
  "8": {
    longDescription: "The Premium Bondage Rope Set includes three professional-grade ropes in different lengths, perfect for both decorative and functional ties.",
    contents: "10ft, 20ft, and 30ft ropes in matching color",
    features: "Soft but strong natural fiber, properly finished ends, minimal stretch",
    directions: "Maintain rope awareness, have safety shears accessible, and monitor circulation frequently."
  }
}

// Required for static export with dynamic routes
export function generateStaticParams() {
  return sampleProducts.map((product) => ({
    productId: product.id,
  }))
} 