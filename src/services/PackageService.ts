import { Api } from '../shared/api'

export interface Package {
  id: string
  name: string
  desc: string
  price: number
  popular: boolean
  is_try: boolean
  createdAt: string
}

export interface PackageSearchParams {
  is_try?: boolean
  popular?: boolean
  page?: number
  limit?: number
  [key: string]: unknown
}

export interface OrderPayload {
  price: number
  id_package: string
  id_user: string
  note?: string
}

export interface Order {
  id: string
  price: number
  id_package: string
  id_user: string
  note?: string
  createdAt: string
}

export class PackageService {
  static async getPackages(params?: PackageSearchParams): Promise<Package[]> {
    try {
      const response = await Api.getPackages(params)
      return response.data?.data || []
    } catch {
      throw new Error('Không thể lấy danh sách gói học')
    }
  }

  static async createOrder(payload: OrderPayload): Promise<Order> {
    try {
      const response = await Api.createOrder(payload)
      return response.data?.data
    } catch {
      throw new Error('Không thể tạo đơn hàng')
    }
  }

  static filterNonTrialPackages(packages: Package[]): Package[] {
    return packages.filter(pkg => !pkg.is_try)
  }

  static getPopularPackages(packages: Package[]): Package[] {
    return packages.filter(pkg => pkg.popular)
  }

  static convertPriceToVND(priceUSD: number, exchangeRate: number = 25000): number {
    return priceUSD * exchangeRate
  }

  static formatPriceVND(priceVND: number): string {
    return `${priceVND.toLocaleString('vi-VN')}₫`
  }
}
