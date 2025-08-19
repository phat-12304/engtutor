import { create } from 'zustand'

export type BookingState = {
  tutorId?: string
  slot?: string
  name?: string
  email?: string
  set: (partial: Partial<BookingState>) => void
  reset: () => void
}

export const useBookingStore = create<BookingState>((set) => ({
  set: (partial) => set((s) => ({ ...s, ...partial })),
  reset: () => set({ tutorId: undefined, slot: undefined, name: undefined, email: undefined }),
}))


