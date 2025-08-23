import { Link, useNavigate } from 'react-router-dom'
import { useUserStore } from '../shared/store'
import { useBooking } from '../hooks/useBooking'
import { useState, useEffect } from 'react'
import { Api } from '../shared/api'

function CheckoutPage() {
  const { booking, dateLabel } = useBooking()

  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [trialPackageId, setTrialPackageId] = useState<string>('')
  const user = useUserStore((s) => s.user)

  // Lấy ID gói học thử từ API
  useEffect(() => {
    Api.getPackages()
      .then((res) => {
        const packages = Array.isArray(res.data?.data) ? res.data.data : []
        // Tìm gói có is_try = true
        const trialPackage = packages.find((pkg: { is_try: boolean; _id?: string; id?: string }) => pkg.is_try === true)
        if (trialPackage) {
          // Sử dụng _id nếu có, không thì dùng id
          const packageId = trialPackage._id || trialPackage.id
          setTrialPackageId(packageId)
          console.log('Found trial package ID:', packageId)
        }
      })
      .catch((error) => {
        console.error('Error fetching trial package:', error)
      })
  }, [])

  if (!booking) {
    return (

      <div className="min-h-[80dvh] bg-gradient-to-br from-blue-50/40 via-slate-50/30 to-indigo-50/40">
        <div className="container-page py-12">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Chưa có thông tin đặt lịch</h3>
            <p className="text-gray-500 mb-6">Vui lòng quay lại để chọn gia sư và thời gian học</p>
            <Link 
              to="/tutors" 
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Quay lại tìm gia sư
            </Link>
          </div>
        </div>
      </div>
    )
  }


    const handleConfirmBooking = async () => {
    if (!booking || !user) return
    
    // Nếu chưa có trialPackageId, fetch lại
    let packageId = trialPackageId
    if (!packageId) {
      try {
        const res = await Api.getPackages()
        const packages = Array.isArray(res.data?.data) ? res.data.data : []
        const trialPackage = packages.find((pkg: { is_try: boolean; _id?: string; id?: string }) => pkg.is_try === true)
        if (trialPackage) {
          packageId = trialPackage._id || trialPackage.id
        } else {
          console.error('No trial package found')
          return
        }
      } catch (error) {
        console.error('Error fetching trial package:', error)
        return
      }
    }
    
    setIsSubmitting(true)
    
    try {
      console.log('Creating order with packageId:', packageId)
      await Api.createOrder({
        price: 0,
        id_package: packageId,
        id_user: user.id,
        note: booking.note || 'Đặt lịch học thử'
      })
      
      sessionStorage.removeItem('booking')
      navigate('/booking-success')
      
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (

    <div className="min-h-[80dvh] bg-gradient-to-br from-blue-50/40 via-slate-50/30 to-indigo-50/40">
      <div className="container-page py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-100 to-blue-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Xác nhận đặt lịch học thử
            </h1>
            <p className="text-lg text-gray-600">Vui lòng kiểm tra thông tin trước khi xác nhận</p>
          </div>

          {/* Booking Details Card */}
          <div className="rounded-3xl border-0 bg-white/95 backdrop-blur-sm p-8 shadow-2xl shadow-gray-900/10 mb-8 animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <span className="h-6 w-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></span>
              Thông tin đặt lịch
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Họ tên</div>
                  <div className="font-semibold text-gray-800">{booking.name}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-green-50 to-blue-50 border border-green-100">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-semibold text-gray-800">{booking.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Thời gian học</div>
                  <div className="font-semibold text-gray-800">{dateLabel}</div>
                </div>
              </div>

              {booking.note && (
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-100">
                  <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Ghi chú</div>
                    <div className="font-semibold text-gray-800">{booking.note}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Free Trial Notice */}
          <div className="rounded-2xl bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 p-6 mb-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-green-700 mb-2">✨ Buổi học thử hoàn toàn miễn phí</h3>
            <p className="text-green-600">Bạn sẽ không phải thanh toán bất kỳ khoản phí nào cho buổi học thử này</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleConfirmBooking}
              disabled={isSubmitting}
              className="flex-1 rounded-2xl bg-gradient-to-r from-green-500 to-blue-600 px-8 py-4 text-white font-semibold text-lg shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Đang xác nhận...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Xác nhận đặt lịch
      </div>

              )}
        </button>

            
            <Link 
              to="/tutors"
              className="flex-1 rounded-2xl border-2 border-gray-300 bg-white px-8 py-4 text-gray-700 font-semibold text-lg text-center hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Chọn lại
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CheckoutPage



