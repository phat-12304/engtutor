import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PackageService, type Package } from '../services'
import { useUserStore } from '../shared/store'

function PaymentPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const user = useUserStore((s) => s.user)
  
  const [packageData, setPackageData] = useState<Package | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  
  const packageId = searchParams.get('packageId')
  const priceVnd = searchParams.get('price')

  useEffect(() => {
    if (!packageId || !priceVnd || !user) {
      navigate('/pricing')
      return
    }

    // Lấy thông tin gói học sử dụng PackageService
    const fetchPackageData = async () => {
      try {
        const packages = await PackageService.getPackages()
        const selectedPackage = packages.find((pkg: Package) => pkg.id === packageId)
        
        if (selectedPackage) {
          setPackageData(selectedPackage)
        } else {
          setError('Không tìm thấy thông tin gói học')
        }
      } catch (err) {
        setError('Không thể tải thông tin gói học')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPackageData()
  }, [packageId, priceVnd, user, navigate])

  const handleConfirmPayment = async () => {
    if (!packageData || !user) return

    setIsProcessing(true)
    
    try {
      // Sử dụng PackageService để tạo order
      const orderResponse = await PackageService.createOrder({
        price: packageData.price,
        id_package: packageData.id,
        id_user: user.id,
        note: `Đặt gói học ${PackageService.formatPriceVND(PackageService.convertPriceToVND(packageData.price))}`
      })

      if (orderResponse?.id) {
        // Chuyển đến trang thành công
        const priceVndNumber = PackageService.convertPriceToVND(packageData.price)
        navigate('/booking-success?type=paid&amount=' + priceVndNumber)
      } else {
        throw new Error('Không thể tạo đơn hàng')
      }
    } catch (error) {
      console.error('Lỗi khi tạo đơn hàng:', error)
      setError('Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleBackToPricing = () => {
    navigate('/pricing')
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-[80dvh] bg-gradient-to-br from-blue-50/30 via-slate-50/20 to-indigo-50/30">
        <div className="container-page py-16 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-blue-500 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700">Đang tải thông tin thanh toán...</h3>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !packageData) {
    return (
      <div className="min-h-[80dvh] bg-gradient-to-br from-blue-50/30 via-slate-50/20 to-indigo-50/30">
        <div className="container-page py-16 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-red-100 to-pink-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Có lỗi xảy ra</h3>
          <p className="text-red-600 mb-4">{error || 'Không tìm thấy thông tin gói học'}</p>
          <button 
            onClick={handleBackToPricing}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Quay lại gói học
          </button>
        </div>
      </div>
    )
  }

  const priceVndNumber = PackageService.convertPriceToVND(packageData.price)

  return (
    <div className="min-h-[80dvh] bg-gradient-to-br from-blue-50/30 via-slate-50/20 to-indigo-50/30">
      <div className="container-page py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Thanh toán gói học
            </h1>
            <p className="text-xl text-gray-600">Vui lòng kiểm tra thông tin trước khi xác nhận thanh toán</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Thông tin gói học */}
            <div className="space-y-6">
              <div className="rounded-3xl border-0 bg-white/95 backdrop-blur-sm p-8 shadow-2xl shadow-gray-900/10 h-fit">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                  <span className="h-8 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></span>
                  Thông tin gói học
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Tên gói</div>
                      <div className="font-semibold text-gray-800">{packageData.name}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-green-50 to-blue-50 border border-green-100">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Giá tiền</div>
                      <div className="text-2xl font-bold text-green-600">{PackageService.formatPriceVND(priceVndNumber)}</div>
                    </div>
                  </div>

                  {packageData.desc && (
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
                      <div className="text-sm text-gray-500 mb-2">Tính năng bao gồm:</div>
                      <ul className="space-y-2">
                        {packageData.desc.split(';').map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                            <div className="w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>{feature.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Thông tin người dùng và xác nhận */}
            <div className="space-y-6">
              <div className="rounded-3xl border-0 bg-white/95 backdrop-blur-sm p-8 shadow-2xl shadow-gray-900/10 h-fit">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                  <span className="h-8 w-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500"></span>
                  Thông tin người dùng
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Họ tên</div>
                      <div className="font-semibold text-gray-800">{user?.name || user?.email || 'N/A'}</div>
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
                      <div className="font-semibold text-gray-800">{user?.email || 'N/A'}</div>
                    </div>
                  </div>
                </div>

                {/* Tổng thanh toán */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-medium text-gray-700">Tổng thanh toán:</span>
                    <span className="text-3xl font-bold text-blue-600">{PackageService.formatPriceVND(priceVndNumber)}</span>
                  </div>
                  <p className="text-sm text-gray-500">Bao gồm tất cả phí dịch vụ</p>
                </div>

                {/* Nút hành động */}
                <div className="flex gap-4">
                  <button
                    onClick={handleBackToPricing}
                    disabled={isProcessing}
                    className="flex-1 px-6 py-4 rounded-2xl border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 transition-all duration-300"
                  >
                    Quay lại
                  </button>
                  <button
                    onClick={handleConfirmPayment}
                    disabled={isProcessing}
                    className="flex-1 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:shadow-lg disabled:opacity-50 transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Đang xử lý...
                      </div>
                    ) : (
                      'Xác nhận thanh toán'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage
