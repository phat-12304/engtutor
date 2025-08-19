function PricingCard({ title, price, features }: { title: string; price: string; features: string[] }) {
  return (
    <div className="flex flex-col rounded-lg border p-6">
      <div className="text-lg font-semibold">{title}</div>
      <div className="mt-2 text-3xl font-bold">{price}</div>
      <ul className="mt-4 space-y-2 text-sm text-gray-700">
        {features.map((f) => <li key={f}>• {f}</li>)}
      </ul>
      <button className="btn mt-6">Chọn gói</button>
    </div>
  )
}

function PricingPage() {
  return (
    <div className="container-page py-10">
      <h1 className="mb-6 text-2xl font-semibold">Gói học</h1>
      <div className="grid gap-6 sm:grid-cols-3">
        <PricingCard title="Starter" price="$49" features={["4 buổi 1-1", "Lịch linh hoạt", "Hỗ trợ qua chat"]} />
        <PricingCard title="Standard" price="$129" features={["12 buổi 1-1", "Kiểm tra đầu vào", "Theo dõi tiến bộ"]} />
        <PricingCard title="Pro" price="$259" features={["24 buổi 1-1", "Kèm tài liệu theo mục tiêu", "Ưu tiên chọn gia sư"]} />
      </div>
    </div>
  )
}

export default PricingPage


