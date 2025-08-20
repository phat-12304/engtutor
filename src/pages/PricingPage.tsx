function PricingCard({ title, price, features, isPopular = false }: { title: string; price: string; features: string[]; isPopular?: boolean }) {
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
      
      <button className={`w-full rounded-2xl py-3.5 font-medium transition-all duration-300 transform hover:scale-105 ${
        isPopular 
          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40' 
          : 'bg-gradient-to-r from-slate-100 to-slate-200 text-gray-700 hover:from-slate-200 hover:to-slate-300'
      }`}>
        {isPopular ? 'Chọn gói phổ biến' : 'Chọn gói'}
      </button>
    </div>
  )
}

function PricingPage() {
  return (
    <div className="min-h-[80dvh] bg-gradient-to-br from-blue-50/30 via-slate-50/20 to-indigo-50/30">
      <div className="container-page py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 leading-relaxed">Gói học</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Chọn gói học phù hợp với mục tiêu và ngân sách của bạn. Tất cả gói đều bao gồm gia sư chất lượng cao và hỗ trợ 24/7.</p>
        </div>
        
                 <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
           <PricingCard 
             title="Cơ bản" 
             price="$49" 
             features={[
               "4 buổi học 1-1", 
               "Lịch học linh hoạt", 
               "Hỗ trợ qua chat 24/7",
               "Tài liệu cơ bản",
               "Báo cáo tiến bộ"
             ]} 
           />
           <PricingCard 
             title="Tiêu chuẩn" 
             price="$129" 
             features={[
               "12 buổi học 1-1", 
               "Kiểm tra đầu vào miễn phí", 
               "Theo dõi tiến bộ chi tiết",
               "Tài liệu nâng cao",
               "Ưu tiên đặt lịch",
               "Hỗ trợ qua video call"
             ]} 
             isPopular={true}
           />
           <PricingCard 
             title="Nâng cao" 
             price="$259" 
             features={[
               "24 buổi học 1-1", 
               "Kèm tài liệu theo mục tiêu", 
               "Ưu tiên chọn gia sư",
               "Lộ trình học cá nhân hóa",
               "Hỗ trợ 24/7 qua nhiều kênh",
               "Đánh giá định kỳ",
               "Chứng chỉ hoàn thành"
             ]} 
           />
         </div>
        
        
      </div>
    </div>
  )
}

export default PricingPage


