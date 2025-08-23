import { useState, useEffect } from 'react'
import { PackageService, type Package } from '../services'
import { useUserStore } from '../shared/store'
import { useNavigate } from 'react-router-dom'

function PricingCard({ 
  title, 
  price, 
  features, 
  isPopular = false, 
  packageId,
  onSelectPackage 
}: { 
  title: string; 
  price: string; 
  features: string[]; 
  isPopular?: boolean;
  packageId: string;
  onSelectPackage: (packageId: string, price: number) => void;
}) {
  return (
    <div className={`group relative flex flex-col rounded-3xl border-0 bg-white/90 backdrop-blur-sm p-8 shadow-lg shadow-gray-900/10 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-[1.02] hover:bg-white ${isPopular ? 'ring-2 ring-blue-500/20' : ''}`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-lg">
            Phổ biến nhất
          </div>
        </div>
      )}
      
      <div className="text-center mb-6">
        <div className="text-xl font-bold text-gray-800 mb-2">{title}</div>
        <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{price}</div>
        <div className="text-sm text-gray-500 mt-1">/tháng</div>
      </div>
      
      <ul className="flex-1 space-y-3 mb-8">
        {features.map((f, index) => (
          <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      
      <button 
        onClick={() => onSelectPackage(packageId, parseInt(price.replace('₫', '').replace(/,/g, '')))}
        className={`w-full rounded-2xl py-3.5 font-medium transition-all duration-300 transform hover:scale-105 ${
          isPopular 
            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40' 
            : 'bg-gradient-to-r from-slate-100 to-slate-200 text-gray-700 hover:from-slate-200 hover:to-slate-300'
        }`}
      >
        {isPopular ? 'Chọn gói phổ biến' : 'Chọn gói'}
      </button>
    </div>
  )
}

function PricingPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const user = useUserStore((s) => s.user)
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    setError(null)
    
    PackageService.getPackages()
      .then((packages) => {
        // Sử dụng service method để lọc gói học
        const filteredPackages = PackageService.filterNonTrialPackages(packages)
        setPackages(filteredPackages)
      })
      .catch((err) => {
        setError('Không thể tải danh sách gói học')
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  // Hàm tách features từ field desc (nối bằng dấu ;)
  const parseFeaturesFromDesc = (desc: string): string[] => {
    if (!desc) return []
    return desc.split(';').map(feature => feature.trim()).filter(feature => feature.length > 0)
  }

  const handleSelectPackage = async (packageId: string, priceVnd: number) => {
    if (!user) {
      // Nếu chưa đăng nhập, chuyển đến trang login
      navigate('/login')
      return
    }

    // Chuyển đến trang thanh toán với thông tin gói học
    navigate(`/payment?packageId=${packageId}&price=${priceVnd}`)
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
          <h3 className="text-xl font-semibold text-gray-700">Đang tải gói học...</h3>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-[80dvh] bg-gradient-to-br from-blue-50/30 via-slate-50/20 to-indigo-50/30">
        <div className="container-page py-16 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-red-100 to-pink-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Có lỗi xảy ra</h3>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Thử lại
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80dvh] bg-gradient-to-br from-blue-50/30 via-slate-50/20 to-indigo-50/30">
      <div className="container-page py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-relaxed">Gói học</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Chọn gói học phù hợp với mục tiêu và ngân sách của bạn. Tất cả gói đều bao gồm gia sư chất lượng cao và hỗ trợ 24/7.</p>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
         {packages.map((pkg) => (
           <PricingCard 
             key={pkg.id}
             title={pkg.name} 
             price={PackageService.formatPriceVND(PackageService.convertPriceToVND(pkg.price))} 
             features={parseFeaturesFromDesc(pkg.desc)}
             isPopular={pkg.popular}
             packageId={pkg.id}
             onSelectPackage={handleSelectPackage}
           />
         ))}
       </div>

      {/* Fallback nếu không có gói nào */}
      {packages.length === 0 && !isLoading && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Chưa có gói học</h3>
          <p className="text-gray-500">Vui lòng thử lại sau</p>
        </div>
      )}
      </div>
    </div>
  )
}

export default PricingPage


