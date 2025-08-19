import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { mockTutors } from '../shared/mockData'
import type { Tutor } from '../shared/mockData'

function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-start gap-4">
        <img className="h-16 w-16 rounded-full object-cover" src={tutor.avatarUrl} alt={tutor.name} />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <Link to={`/tutors/${tutor.id}`} className="text-lg font-semibold hover:text-blue-600">{tutor.name}</Link>
            <div className="text-sm text-gray-600">{tutor.country}</div>
          </div>
          <div className="mt-1 text-sm text-gray-600">{tutor.specialties.join(', ')}</div>
          <div className="mt-3 flex items-center justify-between">
            <div className="text-sm">{tutor.rating.toFixed(1)} ⭐ ({tutor.reviews} đánh giá)</div>
            <Link to={`/booking/${tutor.id}`} className="btn">Học thử</Link>
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
    <div className="container-page py-8">
      <h1 className="mb-4 text-2xl font-semibold">Tìm gia sư</h1>
      <div className="mb-6 flex items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm theo tên hoặc chuyên môn"
          className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:max-w-md"
        />
        <Link to="/pricing" className="btn-outline">Xem gói học</Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map(t => (
          <TutorCard key={t.id} tutor={t} />
        ))}
      </div>
    </div>
  )
}

export default TutorsPage


