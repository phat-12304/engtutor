import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <>
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="container-page grid min-h-[45dvh] items-center gap-8 py-6 lg:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold sm:text-5xl">
              Học tiếng Anh 1-1 với gia sư phù hợp nhất
            </h1>
            <p className="text-gray-600">
              Tìm gia sư, đặt lịch học thử miễn phí, sau đó chọn gói học phù hợp.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/tutors" className="btn rounded-full">Tìm gia sư</Link>
              <Link to="/pricing" className="btn-outline rounded-full">Xem giá</Link>
            </div>
          </div>
          <div className="">
            <img src="/output-onlinepngtools.png" alt="EngTutor" className="mx-auto h-48 w-48" />
          </div>
        </div>
      </section>

      <section className="container-page pt-4 pb-12">
        <h2 className="mb-6 text-2xl font-semibold">Cách hoạt động</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-lg border p-6">
            <div className="text-lg font-medium">1. Tìm gia sư phù hợp</div>
            <p className="mt-2 text-gray-600">Lọc theo mục tiêu, cấp độ, ngân sách.</p>
          </div>
          <div className="rounded-lg border p-6">
            <div className="text-lg font-medium">2. Đặt lịch học thử</div>
            <p className="mt-2 text-gray-600">Chọn thời gian rảnh của bạn và gia sư.</p>
          </div>
          <div className="rounded-lg border p-6">
            <div className="text-lg font-medium">3. Chọn gói học</div>
            <p className="mt-2 text-gray-600">Thanh toán an toàn, học ngay trên nền tảng.</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage


