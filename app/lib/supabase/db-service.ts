import { createClient as createClientServer } from './server'
import { createClient as createClientBrowser } from './client'
import type { Database } from './database.types'

/**
 * Generic database service for handling CRUD operations
 * Can be used in both server and client components
 */
export class DbService<T extends keyof Database['public']['Tables']> {
  private isServer: boolean
  private tableName: T

  constructor(tableName: T) {
    this.tableName = tableName
    this.isServer = typeof window === 'undefined'
  }

  /**
   * Get Supabase client based on execution context
   * Protected so it can be accessed by child classes
   */
  protected getSupabaseClient() {
    return this.isServer ? createClientServer() : createClientBrowser()
  }

  /**
   * Get all records from a table with optional filters
   */
  async getAll(options?: {
    filters?: Record<string, any>
    limit?: number
    orderBy?: { column: string; ascending?: boolean }
  }) {
    const supabase = this.getSupabaseClient()
    
    let query = supabase.from(this.tableName).select('*')
    
    if (options?.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        query = query.eq(key, value)
      })
    }
    
    if (options?.orderBy) {
      query = query.order(options.orderBy.column, { 
        ascending: options.orderBy.ascending ?? true 
      })
    }
    
    if (options?.limit) {
      query = query.limit(options.limit)
    }
    
    return await query
  }

  /**
   * Get a single record by ID
   */
  async getById(id: string) {
    const supabase = this.getSupabaseClient()
    return await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single()
  }

  /**
   * Create a new record
   */
  async create(data: any) {
    const supabase = this.getSupabaseClient()
    return await supabase
      .from(this.tableName)
      .insert(data)
      .select()
      .single()
  }

  /**
   * Update a record by ID
   */
  async update(id: string, data: any) {
    const supabase = this.getSupabaseClient()
    return await supabase
      .from(this.tableName)
      .update(data)
      .eq('id', id)
      .select()
      .single()
  }

  /**
   * Delete a record by ID
   */
  async delete(id: string) {
    const supabase = this.getSupabaseClient()
    return await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id)
  }
} 