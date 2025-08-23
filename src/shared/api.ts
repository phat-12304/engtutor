import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
});



// Example endpoints for future BE integration
export const Api = {
  // Auth endpoints
  auth: {
    register: (payload: { email: string; password: string }) =>
      apiClient.post('/register', payload),

    login: (payload: { email: string; password: string }) =>
      apiClient.post('/login', payload),

    me: () => apiClient.get('/me'),
  },

  getPackages: (params?: Record<string, unknown>) => 
    apiClient.get('/packages', { params }),

  getTutor: (id: string) => apiClient.get(`/tutors/${id}`),

  getTrySchedules: (tutorId: string) => 
    apiClient.get(`/schedules-try/${tutorId}`),

  createOrder: (payload: { price: number; id_package: string; id_user: string; note?: string }) =>
    apiClient.post('/orders', payload),

  // Tutor endpoints  
  searchTutors: (params?: Record<string, unknown>) => apiClient.get('/tutors', { params }),
  createTrialBooking: (payload: unknown) => apiClient.post('/bookings', payload),
}
