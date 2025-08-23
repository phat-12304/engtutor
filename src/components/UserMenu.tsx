import { useEffect, useRef } from 'react'

type UserMenuProps = {
  user: { name?: string; email: string; image?: string; image_url?: string } | null
  open: boolean
  onClose: () => void
  onLogout: () => void
}

export default function UserMenu({ user, open, onClose, onLogout }: UserMenuProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={ref}
      className="absolute right-0 top-11 z-50 w-60 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="flex items-center gap-3 rounded-xl p-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5 text-gray-600">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.118a7.5 7.5 0 0 1 15 0V21a.75.75 0 0 1-.75.75h-13.5A.75.75 0 0 1 4.5 21v-.882Z" />
        </svg>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-gray-900">{user?.name || user?.email || 'Tài khoản'}</div>
        </div>
      </div>
      <button
        onClick={onLogout}
        className="mt-1 flex w-full items-center gap-3 rounded-xl p-2 text-left text-sm text-red-600 hover:bg-red-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l3.75 3M15.75 12H8.25" />
        </svg>
        <span>Logout</span>
      </button>
    </div>
  )
}
