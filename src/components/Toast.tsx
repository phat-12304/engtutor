import { useEffect } from 'react'

type ToastProps = {
  message: string
  type: 'success' | 'error'
  isVisible: boolean
  onClose: () => void
}

export function Toast({ message, type, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-slideIn">
      <div className={`rounded-lg p-4 shadow-lg ${
        type === 'success' 
          ? 'bg-green-500 text-white' 
          : 'bg-red-500 text-white'
      }`}>
        <div className="flex items-center gap-2">
          <span className="text-lg">
            {type === 'success' ? '✅' : '❌'}
          </span>
          <span className="font-medium">{message}</span>
          <button 
            onClick={onClose}
            className="ml-2 text-white/80 hover:text-white"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
