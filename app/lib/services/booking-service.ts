import { DbService } from '../supabase/db-service'
import type { Database } from '../supabase/database.types'

type Booking = Database['public']['Tables']['dungeon_bookings']['Row']
type BookingInsert = Database['public']['Tables']['dungeon_bookings']['Insert']
type BookingUpdate = Database['public']['Tables']['dungeon_bookings']['Update']

export class BookingService extends DbService<'dungeon_bookings'> {
  constructor() {
    super('dungeon_bookings')
  }

  /**
   * Get bookings for a specific user
   */
  async getUserBookings(userId: string) {
    return this.getAll({
      filters: { user_id: userId },
      orderBy: { column: 'booking_date', ascending: false }
    })
  }

  /**
   * Create a new booking
   */
  async createBooking(booking: BookingInsert) {
    return this.create(booking)
  }

  /**
   * Update a booking's status
   */
  async updateBookingStatus(id: string, status: string) {
    return this.update(id, { status })
  }

  /**
   * Check if a time slot is available
   */
  async isTimeSlotAvailable(date: string, duration: number) {
    const supabase = this.getSupabaseClient()
    
    // Convert provided date to a Date object
    const bookingDate = new Date(date)
    
    // Calculate the end time based on duration (in hours)
    const bookingEndTime = new Date(bookingDate.getTime() + duration * 60 * 60 * 1000)
    
    // Format the dates for comparison
    const bookingDateStr = bookingDate.toISOString()
    const bookingEndTimeStr = bookingEndTime.toISOString()
    
    // Check for any overlapping bookings
    const { data, error } = await supabase
      .from('dungeon_bookings')
      .select('*')
      .or(`booking_date.gte.${bookingDateStr},booking_date.lt.${bookingEndTimeStr}`)
      .not('status', 'eq', 'cancelled')
    
    if (error) {
      throw new Error(`Error checking availability: ${error.message}`)
    }
    
    // If no overlapping bookings found, the slot is available
    return { available: data.length === 0, conflictingBookings: data }
  }

  /**
   * Get upcoming bookings (next 7 days)
   */
  async getUpcomingBookings() {
    const supabase = this.getSupabaseClient()
    
    // Get current date
    const now = new Date()
    
    // Get date 7 days from now
    const next7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    
    // Format dates for query
    const nowStr = now.toISOString()
    const next7DaysStr = next7Days.toISOString()
    
    return await supabase
      .from('dungeon_bookings')
      .select('*')
      .gte('booking_date', nowStr)
      .lt('booking_date', next7DaysStr)
      .not('status', 'eq', 'cancelled')
      .order('booking_date', { ascending: true })
  }
} 