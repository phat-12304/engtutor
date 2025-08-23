import { useState } from 'react'
import { useUserStore } from '../shared/store'
import UserMenu from './UserMenu'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openUserMenu, setOpenUserMenu] = useState(false)
  const { user, isAuthenticated, logout } = useUserStore()
  const avatarSrc = user?.image_url || user?.image || '/person2.png'

  return (
    <header className="bg-white shadow-sm">
      <div className="container-page flex h-16 items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 font-semibold">
          <img src="/output-onlinepngtools.png" alt="EngTutor" className="h-8 w-8" />
          <span className="text-lg">EngTutor</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <a href="/tutors" className="flex items-center gap-2 text-gray-900 hover:text-blue-600 transition-colors duration-200">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <span className="hidden lg:inline">Gia sư</span>
          </a>
          <a href="/pricing" className="flex items-center gap-2 text-gray-900 hover:text-blue-600 transition-colors duration-200">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="hidden lg:inline">Gói học</span>
          </a>

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setOpenUserMenu((v) => !v)}
                className="flex items-center focus:outline-none"
              >
                <img src={avatarSrc} alt="avatar" className="h-9 w-9 rounded-full object-cover border" />
              </button>
              <UserMenu
                user={user}
                open={openUserMenu}
                onClose={() => setOpenUserMenu(false)}
                onLogout={() => { logout(); setOpenUserMenu(false) }}
              />
            </div>
          ) : (
            <a href="/login" className="btn rounded-full px-5 py-2.5 text-sm">Đăng nhập</a>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container-page py-4 space-y-3">
            <a 
              href="/tutors" 
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <span className="font-medium text-gray-900">Gia sư</span>
            </a>
            <a 
              href="/pricing" 
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium text-gray-900">Gói học</span>
            </a>
            {isAuthenticated ? (
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <img src={avatarSrc} alt="avatar" className="h-8 w-8 rounded-full object-cover border" />
                  <span className="text-sm font-medium">{user?.name || user?.email}</span>
                </div>
                <button onClick={() => { logout(); setIsMobileMenuOpen(false) }} className="text-sm text-red-600">Đăng xuất</button>
              </div>
            ) : (
              <a 
                href="/login" 
                className="flex items-center justify-center gap-2 p-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Đăng nhập
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
