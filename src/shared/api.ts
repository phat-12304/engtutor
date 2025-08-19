import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 15000,
})

// Example endpoints for future BE integration
export const Api = {
  searchTutors: (params?: Record<string, unknown>) => apiClient.get('/tutors', { params }),
  getTutor: (id: string) => apiClient.get(`/tutors/${id}`),
  createTrialBooking: (payload: unknown) => apiClient.post('/bookings', payload),
}


