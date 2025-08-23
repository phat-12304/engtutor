import { Api } from '../shared/api'

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  email: string
  password: string
}

export interface User {
  id: string
  email: string
  name?: string
  image?: string
  image_url?: string
}

export class AuthService {
  static async login(payload: LoginPayload): Promise<User> {
    try {
      const response = await Api.auth.login(payload)
      return response.data
    } catch {
      throw new Error('Đăng nhập thất bại')
    }
  }

  static async register(payload: RegisterPayload): Promise<User> {
    try {
      const response = await Api.auth.register(payload)
      return response.data
    } catch {
      throw new Error('Đăng ký thất bại')
    }
  }

  static async getCurrentUser(): Promise<User> {
    try {
      const response = await Api.auth.me()
      return response.data
    } catch {
      throw new Error('Không thể lấy thông tin người dùng')
    }
  }

  static logout(): void {
    // Clear local storage, cookies, etc.
    localStorage.removeItem('user-storage')
    sessionStorage.clear()
  }
}
