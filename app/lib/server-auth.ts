import { createClient } from './supabase/server'
import { User } from '@supabase/supabase-js'

/**
 * Retrieves the current user from Supabase Auth (server-side only)
 * Can be used in server components and route handlers
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    return session?.user ?? null
  } catch (error) {
    console.error('Error getting user:', error)
    return null
  }
}

/**
 * Checks if the user is authenticated (server-side only)
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return !!user
} 