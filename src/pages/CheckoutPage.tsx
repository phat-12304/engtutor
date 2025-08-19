import { Link } from 'react-router-dom'

type Booking = {
  tutorId: string
  name: string
  email: string
  slot: string
  note?: string
}

function CheckoutPage() {
  const booking: Booking | null = (() => {
    const raw = sessionStorage.getItem('booking')
    try { return raw ? JSON.parse(raw) as Booking : null } catch { return null }
  })()

  if (!booking) {
    return (
      <div className="container-page py-8">
        <p className="mb-4">Chưa có thông tin đặt lịch.</p>
        <Link to="/tutors" className="btn">Quay lại tìm gia sư</Link>
      </div>
    )
  }

  const dateLabel = new Date(booking.slot).toLocaleString()

  return (
    <div className="container-page py-8">
      <h1 className="mb-4 text-2xl font-semibold">Xác nhận đặt lịch học thử</h1>
      <div className="rounded-lg border p-4 text-sm">
        <div><span className="font-medium">Họ tên:</span> {booking.name}</div>
        <div><span className="font-medium">Email:</span> {booking.email}</div>
        <div><span className="font-medium">Thời gian:</span> {dateLabel}</div>
        {booking.note && <div><span className="font-medium">Ghi chú:</span> {booking.note}</div>}
      </div>
      <div className="mt-6 flex gap-3">
        <button className="btn">Thanh toán (demo)</button>
        <Link to="/tutors" className="btn-outline">Chọn lại</Link>
      </div>
      <p className="mt-3 text-xs text-gray-500">Thanh toán demo: không thực hiện giao dịch thật.</p>
    </div>
  )
}

export default CheckoutPage


