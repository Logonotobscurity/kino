import { DbService } from '../supabase/db-service'
import type { Database } from '../supabase/database.types'

type Product = Database['public']['Tables']['products']['Row']
type ProductInsert = Database['public']['Tables']['products']['Insert']
type ProductUpdate = Database['public']['Tables']['products']['Update']

export class ProductService extends DbService<'products'> {
  constructor() {
    super('products')
  }

  /**
   * Get products by category
   */
  async getByCategory(category: string) {
    return this.getAll({
      filters: { category },
      orderBy: { column: 'created_at', ascending: false }
    })
  }

  /**
   * Search products by name or description
   */
  async searchProducts(query: string) {
    const supabase = this.getSupabaseClient()
    
    // Convert query to lowercase for case-insensitive search
    const searchTerm = `%${query.toLowerCase()}%`
    
    return await supabase
      .from('products')
      .select('*')
      .or(`name.ilike.${searchTerm},description.ilike.${searchTerm}`)
  }

  /**
   * Create a new product
   */
  async createProduct(product: ProductInsert) {
    return this.create(product)
  }

  /**
   * Update a product
   */
  async updateProduct(id: string, product: ProductUpdate) {
    return this.update(id, product)
  }

  /**
   * Get all featured products (helper method example)
   */
  async getFeaturedProducts(limit = 6) {
    const supabase = this.getSupabaseClient()
    
    return await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)
  }
} 