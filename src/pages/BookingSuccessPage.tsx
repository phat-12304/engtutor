import { Link, useSearchParams } from 'react-router-dom'

function BookingSuccessPage() {
  const [searchParams] = useSearchParams()
  const type = searchParams.get('type')
  const amount = searchParams.get('amount')

  const isPaidPackage = type === 'paid'
  const isTrialBooking = !isPaidPackage

  // Xử lý amount một cách an toàn
  const formatAmount = (amountStr: string | null) => {
    if (!amountStr) return null
    const num = parseInt(amountStr)
    if (isNaN(num)) return null
    return num.toLocaleString('vi-VN')
  }

  const formattedAmount = formatAmount(amount)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/40 via-slate-50/30 to-blue-50/40 flex items-center justify-center -mt-16">
      <div className="container-page">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-100 to-blue-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {isPaidPackage ? 'Mua gói học thành công!' : 'Đặt lịch học thử thành công!'}
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            {isPaidPackage ? (
              <>
                Cảm ơn bạn đã mua gói học! Chúng tôi đã gửi email xác nhận chi tiết về gói học của bạn.
                {formattedAmount && (
                  <span className="block mt-2 text-xl font-semibold text-blue-600">
                    Số tiền: {formattedAmount}₫
                  </span>
                )}
              </>
            ) : (
              'Chúng tôi đã gửi email xác nhận chi tiết về buổi học thử của bạn.'
            )}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/tutors"
              className="inline-block rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-3 text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105"
            >
              Xem thêm gia sư
            </Link>
            
            {isPaidPackage && (
              <Link 
                to="/pricing"
                className="inline-block rounded-2xl border-2 border-blue-500 px-8 py-3 text-blue-500 font-medium hover:bg-blue-50 transition-all duration-300"
              >
                Xem gói học khác
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingSuccessPage