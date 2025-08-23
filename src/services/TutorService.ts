import { Api } from '../shared/api'

export interface Tutor {
  id: string
  name: string
  email: string
  image?: string
  rating?: number
  subjects?: string[]
  experience?: number
  description?: string
}

export interface TutorSearchParams {
  subject?: string
  rating?: number
  experience?: number
  page?: number
  limit?: number
  [key: string]: unknown
}

export interface TrySchedule {
  id: string
  tutorId: string
  date: string
  time: string
  available: boolean
}

export interface TrialBookingPayload {
  tutorId: string
  date: string
  time: string
  name: string
  email: string
}

export interface TrialBookingResponse {
  id: string
  status: string
  message?: string
}

export class TutorService {
  static async searchTutors(params?: TutorSearchParams): Promise<Tutor[]> {
    try {
      const response = await Api.searchTutors(params)
      return response.data?.data || []
    } catch {
      throw new Error('Không thể tìm kiếm gia sư')
    }
  }

  static async getTutorById(id: string): Promise<Tutor> {
    try {
      const response = await Api.getTutor(id)
      return response.data
    } catch {
      throw new Error('Không thể lấy thông tin gia sư')
    }
  }

  static async getTrySchedules(tutorId: string): Promise<TrySchedule[]> {
    try {
      const response = await Api.getTrySchedules(tutorId)
      return response.data?.data || []
    } catch {
      throw new Error('Không thể lấy lịch học thử')
    }
  }

  static async createTrialBooking(payload: TrialBookingPayload): Promise<TrialBookingResponse> {
    try {
      const response = await Api.createTrialBooking(payload)
      return response.data
    } catch {
      throw new Error('Không thể tạo lịch học thử')
    }
  }
}
