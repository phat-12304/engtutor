import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import { mockTutors } from '../shared/mockData'

const schema = z.object({
  name: z.string().min(2, 'Nhập tên của bạn'),
  email: z.string().email('Email không hợp lệ'),
  slot: z.string(),
  note: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

function BookingPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const tutor = mockTutors.find(t => t.id === id)

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { slot: tutor?.availableSlots?.[0] ?? '' },
  })

  if (!tutor) return <div className="container-page py-8">Gia sư không tồn tại.</div>

  const onSubmit = (values: FormValues) => {
    sessionStorage.setItem('booking', JSON.stringify({ ...values, tutorId: tutor.id }))
    navigate('/checkout')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container-page grid gap-8 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2 animate-slideUp">
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-3xl font-bold gradient-text">
              Đặt lịch học thử với {tutor.name}
            </h1>
            <p className="text-gray-600 text-lg">
              Hãy điền thông tin bên dưới để đặt lịch học thử miễn phí
            </p>
          </div>
          
          <div className="rounded-2xl glass p-8 shadow-xl hover-lift">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="group animate-fadeIn">
                <label className="mb-2 block text-sm font-medium text-gray-700 transition-colors group-focus-within:text-blue-600">
                  Họ tên
                </label>
                <input 
                  {...register('name')} 
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm transition-all duration-300 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 hover:border-gray-300 hover-lift" 
                  placeholder="Nhập họ tên đầy đủ của bạn"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-500 animate-fadeIn">
                    {errors.name.message}
                  </p>
                )}
              </div>
              
              <div className="group animate-fadeIn" style={{animationDelay: '0.1s'}}>
                <label className="mb-2 block text-sm font-medium text-gray-700 transition-colors group-focus-within:text-blue-600">
                  Email
                </label>
                <input 
                  {...register('email')} 
                  type="email"
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm transition-all duration-300 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 hover:border-gray-300 hover-lift" 
                  placeholder="example@email.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500 animate-fadeIn">
                    {errors.email.message}
                  </p>
                )}
              </div>
              
              <div className="group animate-fadeIn" style={{animationDelay: '0.2s'}}>
                <label className="mb-2 block text-sm font-medium text-gray-700 transition-colors group-focus-within:text-blue-600">
                  Chọn lịch
                </label>
                <select 
                  {...register('slot')} 
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm transition-all duration-300 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 hover:border-gray-300 cursor-pointer hover-lift"
                >
                  {tutor.availableSlots.map(s => (
                    <option key={s} value={s}>
                      {new Date(s).toLocaleString('vi-VN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="group animate-fadeIn" style={{animationDelay: '0.3s'}}>
                <label className="mb-2 block text-sm font-medium text-gray-700 transition-colors group-focus-within:text-blue-600">
                  Ghi chú (tuỳ chọn)
                </label>
                <textarea 
                  {...register('note')} 
                  rows={4} 
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm transition-all duration-300 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-100 hover:border-gray-300 resize-none hover-lift" 
                  placeholder="Ghi chú thêm về buổi học thử..."
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 text-white font-semibold text-lg transition-all duration-300 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1 active:scale-95 animate-fadeIn"
                style={{animationDelay: '0.4s'}}
              >
                ✨ Tiếp tục
              </button>
            </form>
          </div>
        </div>
        
        <aside className="lg:col-span-1 animate-slideUp" style={{animationDelay: '0.2s'}}>
          <div className="sticky top-8">
            <div className="rounded-2xl glass p-6 shadow-xl hover-lift">
              <div className="mb-4 text-center">
                <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center animate-bounceIn">
                  <span className="text-2xl text-white font-bold">
                    {tutor.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Tóm tắt</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/50 hover-lift transition-all duration-300">
                  <span className="text-sm font-medium text-gray-600">Gia sư:</span>
                  <span className="text-sm font-semibold text-gray-800">{tutor.name}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-xl bg-green-50/50 hover-lift transition-all duration-300">
                  <span className="text-sm font-medium text-gray-600">Phí giờ:</span>
                  <span className="text-lg font-bold text-green-600">{tutor.pricePerHour}$</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50/50 hover-lift transition-all duration-300">
                  <span className="text-sm font-medium text-gray-600">Buổi học:</span>
                  <span className="text-sm font-semibold text-purple-600">Học thử miễn phí</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 hover-lift">
                <p className="text-xs text-center text-gray-600">
                  ✨ Buổi học thử đầu tiên hoàn toàn miễn phí
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default BookingPage


