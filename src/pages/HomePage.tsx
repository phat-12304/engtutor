import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { HomeController } from '../controllers'
import type { CountState } from '../services/AnimationService'

function HomePage() {
  const [counts, setCounts] = useState<CountState>({
    students: 0,
    tutors: 0,
    lessons: 0,
    rating: 0
  })

  const statsSectionRef = useRef<HTMLDivElement>(null)
  const homeControllerRef = useRef<HomeController | null>(null)

  useEffect(() => {
    if (!statsSectionRef.current) return

    // Tạo controller instance
    homeControllerRef.current = new HomeController(
      // onCountsUpdate callback
      (newCounts) => {
        setCounts(newCounts)
      },
      // onAnimationComplete callback
      () => {
        console.log('Animation completed')
      }
    )

    // Bắt đầu animation
    homeControllerRef.current.startCountAnimation(statsSectionRef.current)

    // Cleanup khi component unmount
    return () => {
      if (homeControllerRef.current) {
        homeControllerRef.current.stopAnimation()
      }
    }
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[27dvh] bg-gradient-to-br from-blue-50/40 via-slate-50/30 to-indigo-50/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5"></div>
        <div className="container-page relative grid min-h-[30dvh] items-center gap-8 py-0 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Học tiếng Anh 1-1 với gia sư phù hợp nhất
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Tìm gia sư chất lượng cao, đặt lịch học thử miễn phí, và chọn gói học phù hợp với mục tiêu của bạn.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/tutors" className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-4 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105">
                Tìm gia sư ngay
              </Link>
              <Link to="/pricing" className="rounded-2xl border-2 border-blue-500 px-8 py-4 text-blue-600 font-semibold hover:bg-blue-50 transition-all duration-300">
                Xem gói học
              </Link>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white"></div>
                </div>
                <span className="text-sm text-gray-600">500+ học viên tin tưởng</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl blur-3xl"></div>
            <img src="/person2.png" alt="EngTutor" className="relative mx-auto h-auto w-full max-w-md drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container-page">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-relaxed py-2">
              Cách hoạt động
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Chỉ cần 3 bước đơn giản để bắt đầu hành trình học tiếng Anh của bạn
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Tìm gia sư phù hợp",
                description: "Lọc theo mục tiêu, cấp độ, ngân sách và đánh giá từ học viên.",
                icon: "🔍"
              },
              {
                step: "2", 
                title: "Đặt lịch học thử",
                description: "Chọn thời gian rảnh của bạn và gia sư để trải nghiệm miễn phí.",
                icon: "📅"
              },
              {
                step: "3",
                title: "Chọn gói học",
                description: "Thanh toán an toàn và học ngay trên nền tảng với gia sư đã chọn.",
                icon: "🚀"
              }
            ].map((item, index) => (
              <div key={index} className="group text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-3xl text-white font-bold shadow-lg shadow-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all duration-300">
                    {item.step}
                  </div>
                  <div className="absolute -top-2 -right-2 text-4xl">{item.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50/50 to-blue-50/30">
        <div className="container-page">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Tại sao chọn chúng tôi?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              EngTutor mang đến trải nghiệm học tiếng Anh chất lượng cao với những ưu điểm vượt trội
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {[
              {
                icon: "👨‍🏫",
                title: "Gia sư chất lượng",
                description: "Đội ngũ gia sư có bằng cấp và kinh nghiệm giảng dạy"
              },
              {
                icon: "🎯",
                title: "Lộ trình cá nhân",
                description: "Học theo mục tiêu và khả năng của từng học viên"
              },
              {
                icon: "⏰",
                title: "Lịch học linh hoạt",
                description: "Chọn thời gian học phù hợp với lịch trình của bạn"
              },
              {
                icon: "💬",
                title: "Hỗ trợ 24/7",
                description: "Luôn sẵn sàng hỗ trợ mọi lúc, mọi nơi"
              }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 text-4xl group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats-section" ref={statsSectionRef} className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container-page">
          <div className="grid gap-8 sm:grid-cols-4 text-center">
            {[
              { number: counts.students, label: "Học viên", suffix: "+" },
              { number: counts.tutors, label: "Gia sư", suffix: "+" },
              { number: counts.lessons, label: "Buổi học", suffix: "+" },
              { number: counts.rating, label: "Đánh giá", suffix: "" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container-page">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Học viên nói gì về chúng tôi?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những phản hồi chân thực từ học viên đã trải nghiệm dịch vụ của EngTutor
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3 max-w-5xl mx-auto">
            {[
              {
                name: "Nguyễn Thị Anh",
                role: "Học sinh THPT",
                content: "Gia sư rất tận tâm, giúp em cải thiện tiếng Anh rõ rệt chỉ sau 2 tháng học.",
                rating: "⭐⭐⭐⭐⭐"
              },
              {
                name: "Trần Văn Bình",
                role: "Sinh viên đại học",
                content: "Lịch học linh hoạt, gia sư chuyên nghiệp. Em rất hài lòng với chất lượng giảng dạy.",
                rating: "⭐⭐⭐⭐⭐"
              },
              {
                name: "Lê Thị Cẩm",
                role: "Nhân viên văn phòng",
                content: "Học online rất tiện lợi, gia sư giúp em tự tin giao tiếp tiếng Anh trong công việc.",
                rating: "⭐⭐⭐⭐⭐"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 shadow-lg shadow-gray-900/10 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-[1.02]">
                <div className="text-yellow-500 text-lg mb-4">{testimonial.rating}</div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
        <div className="container-page text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Sẵn sàng bắt đầu hành trình học tiếng Anh?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Tham gia cùng hàng trăm học viên đã cải thiện tiếng Anh với EngTutor
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/tutors" className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-4 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105">
                Tìm gia sư ngay
              </Link>
              <Link to="/pricing" className="rounded-2xl border-2 border-blue-500 px-8 py-4 text-blue-600 font-semibold hover:bg-blue-50 transition-all duration-300">
                Xem gói học
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage


