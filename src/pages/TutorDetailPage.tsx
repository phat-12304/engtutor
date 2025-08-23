import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Api } from '../shared/api'
import { useUserStore } from '../shared/store'

type TutorDetailData = {
  id: string
  name: string
  image: string
  image_url: string
  nation: string
  createdAt: string
}

type ScheduleData = {
  id: string
  datetime: string
  is_try: boolean
  id_tutor: string
  id_order?: string
  createdAt: string
}

function TutorDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isAuthenticated = useUserStore((s) => s.isAuthenticated)
  const [tutor, setTutor] = useState<TutorDetailData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [availableSlots, setAvailableSlots] = useState<string[]>([])

  const handleTrialClick = () => {
    if (!isAuthenticated) {
      // Chưa đăng nhập -> chuyển đến trang đăng nhập với redirect URL
      navigate('/login', { 
        state: { 
          from: `/booking/${tutor?.id}`,
          message: 'Vui lòng đăng nhập để đặt lịch học thử'
        }
      })
    } else {
      // Đã đăng nhập -> chuyển đến trang đặt lịch
      navigate(`/booking/${tutor?.id}`)
    }
  }

  useEffect(() => {
    if (!id) return
    
    setIsLoading(true)
    setError(null)
    
    // Lấy thông tin giáo viên
    Api.getTutor(id)
      .then((res) => {
        setTutor(res.data.data)
      })
      .catch((err) => {
        setError('Không thể tải thông tin gia sư')
        console.error(err)
      })
    
    // Lấy lịch học thử có sẵn
    Api.getTrySchedules(id)
      .then((res) => {
        const slots = res.data.data.map((schedule: ScheduleData) => schedule.datetime)
        setAvailableSlots(slots)
      })
      .catch((err) => {
        console.error('Không thể tải lịch học thử:', err)
        setAvailableSlots([])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  if (isLoading) {
    return <div className="container-page py-8">Đang tải...</div>
  }

  if (error || !tutor) {
    return <div className="container-page py-8">Không tìm thấy gia sư.</div>
  } 
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container-page grid gap-8 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8 animate-slideUp">
          {/* Header Section */}
          <div className="rounded-2xl glass p-8 shadow-xl hover-lift">
            <div className="flex items-start gap-6">
              <div className="relative">
                {/* Ảnh từ API */}
                <img 
                  className="h-24 w-24 rounded-2xl object-cover shadow-lg transition-transform duration-300 hover:scale-105" 
                  src={tutor.image_url} 
                  alt={tutor.name} 
                />
                <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
              </div>
              <div className="flex-1">
                {/* Tên từ API */}
                <h1 className="mb-2 text-3xl font-bold gradient-text">{tutor.name}</h1>
                <div className="mb-3 flex items-center gap-3">
                  {/* Quốc gia từ API */}
                  <span className="text-gray-600">📍 {tutor.nation}</span>
                  {/* Rating tĩnh */}
                  <span className="flex items-center gap-1 text-amber-500">
                    <span className="text-lg">⭐</span>
                    <span className="font-semibold">5.0</span>
                    <span className="text-gray-500">(0 đánh giá)</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-green-400"></span>
                    Trực tuyến
                  </span>
                  <span>•</span>
                  {/* Kinh nghiệm tĩnh */}
                  <span>5+ năm kinh nghiệm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section - Tĩnh */}
          <div className="rounded-2xl glass p-8 shadow-xl hover-lift animate-fadeIn" style={{animationDelay: '0.1s'}}>
            <h2 className="mb-4 text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="h-6 w-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></span>
              Giới thiệu
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Giáo viên có kinh nghiệm giảng dạy tiếng Anh cho người Việt Nam, 
              chuyên về giao tiếp và luyện thi chứng chỉ quốc tế. Phương pháp 
              giảng dạy hiện đại, thân thiện và hiệu quả.
            </p>
          </div>

          {/* Specialties Section - Tĩnh */}
          <div className="rounded-2xl glass p-8 shadow-xl hover-lift animate-fadeIn" style={{animationDelay: '0.2s'}}>
            <h2 className="mb-4 text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="h-6 w-1 rounded-full bg-gradient-to-r from-green-500 to-blue-500"></span>
              Chuyên môn
            </h2>
            <div className="flex flex-wrap gap-3">
              {['Tiếng Anh giao tiếp', 'IELTS', 'TOEIC'].map((s, index) => (
                <span 
                  key={s} 
                  className="rounded-xl bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 text-sm font-medium text-blue-700 border border-blue-200 transition-all duration-300 hover:from-blue-200 hover:to-purple-200 hover:scale-105 hover:shadow-md"
                  style={{animationDelay: `${0.3 + index * 0.1}s`}}
                >
                  ✨ {s}
                </span>
              ))}
            </div>
          </div>

          {/* Teaching Style Section - Tĩnh */}
          <div className="rounded-2xl glass p-8 shadow-xl hover-lift animate-fadeIn" style={{animationDelay: '0.4s'}}>
            <h2 className="mb-4 text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="h-6 w-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></span>
              Phương pháp giảng dạy
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/50 hover-lift">
                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">🎯</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Luyện nói tự nhiên</h3>
                  <p className="text-sm text-gray-600">Tập trung vào giao tiếp thực tế, không chỉ lý thuyết</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50/50 hover-lift">
                <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">📚</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Tài liệu chuẩn</h3>
                  <p className="text-sm text-gray-600">Sử dụng giáo trình quốc tế và tài liệu cập nhật</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-purple-50/50 hover-lift">
                <div className="h-10 w-1 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">💬</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">1-1 cá nhân hóa</h3>
                  <p className="text-sm text-gray-600">Lộ trình học tập được thiết kế riêng cho từng học viên</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-pink-50/50 hover-lift">
                <div className="h-10 w-10 rounded-full bg-pink-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">🎉</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Học vui vẻ</h3>
                  <p className="text-sm text-gray-600">Tạo môi trường học tập thoải mái và thú vị</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1 animate-slideUp" style={{animationDelay: '0.3s'}}>
          <div className="sticky top-8 space-y-6">
            {/* Price Card - Tĩnh */}
            <div className="rounded-2xl glass p-6 shadow-xl hover-lift">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-800 mb-2">25$</div>
                <div className="text-gray-600">/ giờ</div>
              </div>
                             <button 
                 onClick={handleTrialClick}
                 className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 text-white font-semibold text-lg text-center block transition-all duration-300 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1 active:scale-95"
               >
                 ✨ Đặt học thử miễn phí
               </button>
            </div>

            {/* Available Slots - Tĩnh */}
            <div className="rounded-2xl glass p-6 shadow-xl hover-lift">
              <h3 className="mb-4 text-lg font-semibold text-gray-800 flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-green-400 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </span>
                Lịch trống gần nhất
              </h3>
              <div className="space-y-3">
                {availableSlots.length > 0 ? (
                  availableSlots.map((slot, index) => (
                    <div 
                      key={slot} 
                      className="p-3 rounded-xl bg-green-50/50 border border-green-100 hover-lift transition-all duration-300"
                      style={{animationDelay: `${0.5 + index * 0.1}s`}}
                    >
                      <div className="text-sm font-medium text-green-700">
                        {new Date(slot).toLocaleDateString('vi-VN', {
                          weekday: 'long',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="text-xs text-gray-600">
                        {new Date(slot).toLocaleTimeString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 rounded-xl bg-gray-50/50 border border-gray-100">
                    <div className="text-sm text-gray-500 text-center">
                      Đang tải lịch học...
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
                <p className="text-xs text-center text-gray-600">
                  💡 Buổi học thử đầu tiên hoàn toàn miễn phí
                </p>
              </div>
            </div>

            {/* Quick Stats - Tĩnh */}
            <div className="rounded-2xl glass p-6 shadow-xl hover-lift">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">Thống kê</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/50">
                  <span className="text-sm text-gray-600">Học viên đã dạy</span>
                  <span className="font-semibold text-blue-600">50+</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-green-50/50">
                  <span className="text-sm text-gray-600">Giờ dạy</span>
                  <span className="font-semibold text-green-600">1000+</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50/50">
                  <span className="text-sm text-gray-600">Đánh giá</span>
                  <span className="font-semibold text-purple-600">0</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default TutorDetailPage


