import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type BookingState = {
  tutorId?: string
  slot?: string
  name?: string
  email?: string
  set: (partial: Partial<BookingState>) => void
  reset: () => void
}

export type UserState = {
  user: {
    id: string
    email: string
    name?: string
    image?: string
    image_url?: string
  } | null
  isAuthenticated: boolean
  setUser: (user: UserState['user']) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'user-storage',
    }
  )
)