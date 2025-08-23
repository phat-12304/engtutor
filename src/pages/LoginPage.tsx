import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { Toast } from '../components/Toast'
import { useToast } from '../hooks/useToast'
import { useAuth } from '../hooks/useAuth'

const signInSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
})

const signUpSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
})

type SignInValues = z.infer<typeof signInSchema>
type SignUpValues = z.infer<typeof signUpSchema>

function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()
  const defaultTab = useMemo(() => (params.get('tab') === 'signup' ? 'signup' : 'signin'), [params])
  const [tab, setTab] = useState<'signin' | 'signup'>(defaultTab as 'signin' | 'signup')

  const { toast, showToast, hideToast } = useToast()
  const { login, register } = useAuth()

  // Lấy redirect URL từ location state
  const redirectUrl = location.state?.from || '/'
  const message = location.state?.message

  const signInForm = useForm<SignInValues>({ resolver: zodResolver(signInSchema) })
  const signUpForm = useForm<SignUpValues>({ resolver: zodResolver(signUpSchema) })

  const onSubmitSignIn = async (values: SignInValues) => {
    try {
      await login(values)
      showToast('Đăng nhập thành công!', 'success')
      // Redirect về trang mà user muốn truy cập ban đầu
      navigate(redirectUrl)
    } catch {
      showToast('Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.', 'error')
    }
  }
  
  const onSubmitSignUp = async (values: SignUpValues) => {
    try {
      await register(values)
      showToast('Đăng ký thành công!', 'success')
      // Prefill form đăng nhập để tránh mismatch do autofill
      signInForm.reset({ email: values.email, password: values.password })
      setTab('signin')
    } catch {
      showToast('Đăng ký thất bại. Vui lòng thử lại.', 'error')
    }
  }

  return (
    <>
      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
      <div className="min-h-[80dvh] bg-gradient-to-br from-blue-50/40 via-slate-50/30 to-indigo-50/40">
        <div className="container-page grid min-h-[80dvh] place-items-center py-8">
          <div className="w-full max-w-md rounded-3xl border-0 bg-white/95 backdrop-blur-sm p-8 shadow-2xl shadow-gray-900/20">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Chào mừng đến với EngTutor</h1>
              <p className="mt-2 text-sm text-gray-500">Đăng nhập hoặc tạo tài khoản mới</p>
              {message && (
                <div className="mt-3 p-3 rounded-xl bg-blue-50 border border-blue-200">
                  <p className="text-sm text-blue-700">{message}</p>
                </div>
              )}
            </div>

            <div className="mb-6 grid grid-cols-2 rounded-2xl border-0 bg-gradient-to-r from-slate-100 to-slate-200 p-1.5 text-sm font-medium">
              <button onClick={() => setTab('signin')} className={`rounded-xl py-2.5 transition-all duration-300 ${tab === 'signin' ? 'bg-white shadow-lg shadow-blue-500/20 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Đăng nhập</button>
              <button onClick={() => setTab('signup')} className={`rounded-xl py-2.5 transition-all duration-300 ${tab === 'signup' ? 'bg-white shadow-lg shadow-blue-500/20 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Đăng ký</button>
            </div>

            {tab === 'signin' ? (
              <form onSubmit={signInForm.handleSubmit(onSubmitSignIn)} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
                  <input autoComplete="username email" type="email" {...signInForm.register('email')} className="w-full rounded-2xl border-0 bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-3.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-lg transition-all duration-300" placeholder="Nhập email của bạn" />
                  {signInForm.formState.errors.email && <p className="mt-2 text-sm text-red-500">{signInForm.formState.errors.email.message}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Mật khẩu</label>
                  <input autoComplete="current-password" type="password" {...signInForm.register('password')} className="w-full rounded-2xl border-0 bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-3.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-lg transition-all duration-300" placeholder="Nhập mật khẩu của bạn" />
                  {signInForm.formState.errors.password && <p className="mt-2 text-sm text-red-500">{signInForm.formState.errors.password.message}</p>}
                </div>
                <button type="submit" disabled={signInForm.formState.isSubmitting} className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 py-3.5 text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed">{signInForm.formState.isSubmitting ? 'Đang đăng nhập…' : 'Đăng nhập'}</button>
              </form>
            ) : (
              <form onSubmit={signUpForm.handleSubmit(onSubmitSignUp)} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" autoComplete="username email" {...signUpForm.register('email')} className="w-full rounded-2xl border-0 bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-3.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-lg transition-all duration-300" placeholder="Nhập email của bạn" />
                  {signUpForm.formState.errors.email && <p className="mt-2 text-sm text-red-500">{signUpForm.formState.errors.email.message}</p>}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Mật khẩu</label>
                  <input type="password" autoComplete="new-password" {...signUpForm.register('password')} className="w-full rounded-2xl border-0 bg-gradient-to-r from-slate-50 to-slate-100 px-4 py-3.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:shadow-lg transition-all duration-300" placeholder="Nhập mật khẩu" />
                  {signUpForm.formState.errors.password && <p className="mt-2 text-sm text-red-500">{signUpForm.formState.errors.password.message}</p>}
                </div>
                <button type="submit" disabled={signUpForm.formState.isSubmitting} className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 py-3.5 text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed">{signUpForm.formState.isSubmitting ? 'Đang tạo…' : 'Tạo tài khoản'}</button>
              </form>
            )}

            <div className="mt-6 text-center text-sm text-gray-500">
              {tab === 'signin' ? (
                <span>Chưa có tài khoản? <button onClick={() => setTab('signup')} className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">Đăng ký</button></span>
              ) : (
                <span>Đã có tài khoản? <button onClick={() => setTab('signin')} className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">Đăng nhập</button></span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage


