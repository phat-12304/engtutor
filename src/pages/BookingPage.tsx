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
    <div className="container-page grid gap-8 py-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <h1 className="mb-4 text-2xl font-semibold">Đặt lịch học thử với {tutor.name}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Họ tên</label>
            <input {...register('name')} className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input {...register('email')} className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Chọn lịch</label>
            <select {...register('slot')} className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {tutor.availableSlots.map(s => (
                <option key={s} value={s}>{new Date(s).toLocaleString()}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Ghi chú (tuỳ chọn)</label>
            <textarea {...register('note')} rows={3} className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="btn">Tiếp tục</button>
        </form>
      </div>
      <aside className="space-y-2 rounded-lg border p-4">
        <div className="text-lg font-semibold">Tóm tắt</div>
        <div className="text-sm text-gray-700">Gia sư: {tutor.name}</div>
        <div className="text-sm text-gray-700">Phí giờ: {tutor.pricePerHour}$</div>
      </aside>
    </div>
  )
}

export default BookingPage


