export type Tutor = {
  id: string
  name: string
  avatarUrl: string
  rating: number
  reviews: number
  country: string
  pricePerHour: number
  specialties: string[]
  intro: string
  availableSlots: string[]
}

export const mockTutors: Tutor[] = [
  {
    id: 't1',
    name: 'Anna Nguyen',
    avatarUrl: 'https://i.pravatar.cc/128?img=5',
    rating: 4.9,
    reviews: 124,
    country: 'Vietnam',
    pricePerHour: 12,
    specialties: ['Giao tiếp', 'IELTS', 'Phát âm'],
    intro: 'Cựu du học sinh Úc, 5 năm dạy 1-1. Tập trung luyện nói tự nhiên.',
    availableSlots: ['2025-08-20T09:00:00', '2025-08-20T19:30:00', '2025-08-21T08:00:00'],
  },
  {
    id: 't2',
    name: 'David Tran',
    avatarUrl: 'https://i.pravatar.cc/128?img=12',
    rating: 4.8,
    reviews: 98,
    country: 'USA',
    pricePerHour: 15,
    specialties: ['Business', 'Phỏng vấn'],
    intro: 'Chuyên ngành Marketing, giúp bạn tự tin giao tiếp công sở.',
    availableSlots: ['2025-08-20T10:00:00', '2025-08-22T20:00:00'],
  },
  {
    id: 't3',
    name: 'Linh Pham',
    avatarUrl: 'https://i.pravatar.cc/128?img=32',
    rating: 5.0,
    reviews: 210,
    country: 'Canada',
    pricePerHour: 18,
    specialties: ['IELTS', 'Academic Writing'],
    intro: '8.5 IELTS, chuyên luyện thi và kỹ năng viết học thuật.',
    availableSlots: ['2025-08-21T09:30:00', '2025-08-23T21:00:00'],
  },
]


