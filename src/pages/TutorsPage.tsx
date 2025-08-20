import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { mockTutors } from '../shared/mockData'
import type { Tutor } from '../shared/mockData'

function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
         <div className="group rounded-3xl border-0 bg-white/90 backdrop-blur-sm p-6 shadow-lg shadow-gray-900/10 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-[1.02] hover:bg-white">
       <div className="flex items-start gap-4">
         <div className="relative flex-shrink-0">
           <img className="h-20 w-20 rounded-2xl object-cover ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all duration-300" src={tutor.avatarUrl} alt={tutor.name} />
           <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
             <div className="h-2 w-2 rounded-full bg-white"></div>
           </div>
         </div>
         
         <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <Link to={`/tutors/${tutor.id}`} className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200 truncate">{tutor.name}</Link>
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-sm font-medium">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {tutor.country}
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {tutor.specialties.map((specialty, index) => (
                <span key={index} className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 text-sm font-medium">
                  {specialty}
                </span>
              ))}
            </div>
          </div>
          
                     <div className="flex items-center justify-between">
             <div className="flex items-center gap-2">
               <div className="flex items-center gap-1">
                 <span className="text-yellow-500 text-lg">⭐</span>
                 <span className="font-bold text-gray-800">{tutor.rating.toFixed(1)}</span>
               </div>
               <span className="text-gray-500 text-sm">({tutor.reviews} đánh giá)</span>
             </div>
             <Link to={`/booking/${tutor.id}`} className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2.5 text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 whitespace-nowrap text-sm">
               Học thử
             </Link>
           </div>
        </div>
      </div>
    </div>
  )
}

function TutorsPage() {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return mockTutors.filter(t => t.name.toLowerCase().includes(q) || t.specialties.join(' ').toLowerCase().includes(q))
  }, [query])

  return (
    <div className="min-h-[80dvh] bg-gradient-to-br from-blue-50/30 via-slate-50/20 to-indigo-50/30">
      <div className="container-page py-12">
                 <div className="mb-8 text-center">
           <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3 leading-relaxed py-2">Tìm gia sư</h1>
           <p className="text-lg text-gray-600">Khám phá đội ngũ gia sư chất lượng cao của chúng tôi</p>
         </div>
        
        <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <div className="relative w-full sm:max-w-md">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm theo tên hoặc chuyên môn..."
              className="w-full rounded-2xl border-0 bg-white/80 backdrop-blur-sm px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white focus:shadow-lg transition-all duration-300 shadow-md"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <Link to="/pricing" className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-4 text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 whitespace-nowrap">Xem gói học</Link>
        </div>
        
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Không tìm thấy gia sư</h3>
            <p className="text-gray-500">Hãy thử tìm kiếm với từ khóa khác</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t, index) => (
              <div key={t.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <TutorCard tutor={t} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TutorsPage


