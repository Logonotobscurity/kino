import { createClient as createClientBrowser } from './supabase/client'
import { User } from '@supabase/supabase-js'

/**
 * Retrieves the current user from Supabase Auth (client-side only)
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const supabase = createClientBrowser()
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error('Error getting user:', error)
    return null
  }
}

/**
 * Checks if the user is authenticated (client-side only)
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return !!user
}

/**
 * Signs out the current user (client-side only)
 */
export async function signOut() {
  const supabase = createClientBrowser()
  await supabase.auth.signOut()
  window.location.href = '/'
} 