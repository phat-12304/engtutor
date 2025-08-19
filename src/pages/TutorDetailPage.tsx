import { Link, useParams } from 'react-router-dom'
import { mockTutors } from '../shared/mockData'

function TutorDetailPage() {
  const { id } = useParams()
  const tutor = mockTutors.find(t => t.id === id)

  if (!tutor) {
    return <div className="container-page py-8">Không tìm thấy gia sư.</div>
  }

  return (
    <div className="container-page grid gap-8 py-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-start gap-4">
          <img className="h-20 w-20 rounded-full object-cover" src={tutor.avatarUrl} alt={tutor.name} />
          <div>
            <h1 className="text-2xl font-semibold">{tutor.name}</h1>
            <div className="text-sm text-gray-600">{tutor.country} • {tutor.rating.toFixed(1)} ⭐ ({tutor.reviews})</div>
          </div>
        </div>
        <p className="text-gray-700">{tutor.intro}</p>
        <div>
          <h2 className="mb-2 font-medium">Chuyên môn</h2>
          <div className="flex flex-wrap gap-2">
            {tutor.specialties.map(s => (
              <span key={s} className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
      <aside className="space-y-4 rounded-lg border p-4">
        <div className="text-lg font-semibold">{tutor.pricePerHour}$ / giờ</div>
        <Link to={`/booking/${tutor.id}`} className="btn w-full">Đặt học thử</Link>
        <div>
          <div className="mb-2 text-sm font-medium">Lịch trống gần nhất</div>
          <ul className="space-y-2 text-sm text-gray-700">
            {tutor.availableSlots.slice(0, 3).map(s => (
              <li key={s}>{new Date(s).toLocaleString()}</li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default TutorDetailPage


