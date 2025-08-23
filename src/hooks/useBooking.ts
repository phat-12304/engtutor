import { useMemo } from 'react'

export type Booking = {
  tutorId: string
  name: string
  email: string
  slot: string
  note?: string
}

export function useBooking() {
  const booking = useMemo<Booking | null>(() => {
    try {
      const raw = sessionStorage.getItem('booking')
      return raw ? (JSON.parse(raw) as Booking) : null
    } catch {
      return null
    }
  }, [])

  const dateLabel = useMemo(() => {
    if (!booking) return ''
    return new Date(booking.slot).toLocaleString()
  }, [booking])

  return { booking, dateLabel }
}


