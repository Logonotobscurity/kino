export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string
          price: number
          image_url: string
          category: string
          attributes: Json
          stock_quantity: number
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description: string
          price: number
          image_url: string
          category: string
          attributes?: Json
          stock_quantity?: number
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string
          price?: number
          image_url?: string
          category?: string
          attributes?: Json
          stock_quantity?: number
        }
      }
      orders: {
        Row: {
          id: string
          created_at: string
          user_id: string
          status: string
          total_amount: number
          shipping_address: Json
          payment_info: Json
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          status?: string
          total_amount: number
          shipping_address: Json
          payment_info: Json
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          status?: string
          total_amount?: number
          shipping_address?: Json
          payment_info?: Json
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          price: number
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          price: number
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          price?: number
        }
      }
      dungeon_bookings: {
        Row: {
          id: string
          created_at: string
          user_id: string
          booking_date: string
          duration: number
          price: number
          status: string
          special_requests: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          booking_date: string
          duration: number
          price: number
          status?: string
          special_requests?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          booking_date?: string
          duration?: number
          price?: number
          status?: string
          special_requests?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          email: string | null
          phone: string | null
          address: Json | null
          preferences: Json | null
          bio: string | null
          membership_tier: string | null
          membership_expiry: string | null
          community_joined: boolean | null
          community_join_date: string | null
          community_level: string | null
          community_badges: Json | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          email?: string | null
          phone?: string | null
          address?: Json | null
          preferences?: Json | null
          bio?: string | null
          membership_tier?: string | null
          membership_expiry?: string | null
          community_joined?: boolean | null
          community_join_date?: string | null
          community_level?: string | null
          community_badges?: Json | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          email?: string | null
          phone?: string | null
          address?: Json | null
          preferences?: Json | null
          bio?: string | null
          membership_tier?: string | null
          membership_expiry?: string | null
          community_joined?: boolean | null
          community_join_date?: string | null
          community_level?: string | null
          community_badges?: Json | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
