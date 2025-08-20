import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="bg-white">
        <div className="container-page flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-semibold">
            <img src="/output-onlinepngtools.png" alt="EngTutor" className="h-8 w-8" />
            <span>EngTutor</span>
          </a>
          <nav className="flex items-center gap-6 text-sm font-semibold">
            <a href="/tutors" className="flex items-center gap-2 text-gray-900 hover:text-blue-600">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              Gia sư
            </a>
            <a href="/pricing" className="flex items-center gap-2 text-gray-900 hover:text-blue-600">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Gói học
            </a>
            <a href="/login" className="btn rounded-full px-5 py-2.5">Đăng nhập</a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t bg-white">
        <div className="container-page py-6 text-sm text-gray-600 text-center">
          © {new Date().getFullYear()} EngTutor. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default App
