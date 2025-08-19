import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useMemo, useState } from 'react'

const signInSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
})

const signUpSchema = z.object({
  name: z.string().min(2, 'Tên tối thiểu 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
  confirm: z.string(),
}).refine((d) => d.password === d.confirm, { path: ['confirm'], message: 'Mật khẩu không khớp' })

type SignInValues = z.infer<typeof signInSchema>
type SignUpValues = z.infer<typeof signUpSchema>

function LoginPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const defaultTab = useMemo(() => (params.get('tab') === 'signup' ? 'signup' : 'signin'), [params])
  const [tab, setTab] = useState<'signin' | 'signup'>(defaultTab as 'signin' | 'signup')

  const signInForm = useForm<SignInValues>({ resolver: zodResolver(signInSchema) })
  const signUpForm = useForm<SignUpValues>({ resolver: zodResolver(signUpSchema) })

  const onSubmitSignIn = async (values: SignInValues) => {
    await new Promise((r) => setTimeout(r, 600))
    localStorage.setItem('demo_token', btoa(values.email))
    navigate('/')
  }
  const onSubmitSignUp = async (values: SignUpValues) => {
    await new Promise((r) => setTimeout(r, 700))
    // Demo: coi như đăng ký xong → đăng nhập luôn
    localStorage.setItem('demo_token', btoa(values.email))
    navigate('/')
  }

  return (
    <div className="min-h-[80dvh] bg-slate-50/60">
      <div className="container-page grid min-h-[80dvh] place-items-center py-8">
        <div className="w-full max-w-md rounded-xl border bg-white p-5 shadow-sm">
          <div className="mb-4 text-center">
            <h1 className="text-xl font-semibold">Welcome to EngTutor</h1>
            <p className="mt-1 text-xs text-gray-600">Sign in or create a new account</p>
          </div>

          <div className="mb-4 grid grid-cols-2 rounded-full border bg-slate-50 p-1 text-xs font-medium">
            <button onClick={() => setTab('signin')} className={`rounded-full py-2 transition-colors ${tab === 'signin' ? 'bg-white shadow' : 'text-gray-600'}`}>Sign In</button>
            <button onClick={() => setTab('signup')} className={`rounded-full py-2 transition-colors ${tab === 'signup' ? 'bg-white shadow' : 'text-gray-600'}`}>Sign Up</button>
          </div>

          {tab === 'signin' ? (
            <form onSubmit={signInForm.handleSubmit(onSubmitSignIn)} className="space-y-3">
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input type="email" {...signInForm.register('email')} className="w-full rounded-md border bg-slate-50 px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {signInForm.formState.errors.email && <p className="mt-1 text-sm text-red-600">{signInForm.formState.errors.email.message}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Password</label>
                <input type="password" {...signInForm.register('password')} className="w-full rounded-md border bg-slate-50 px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {signInForm.formState.errors.password && <p className="mt-1 text-sm text-red-600">{signInForm.formState.errors.password.message}</p>}
              </div>
              <button type="submit" disabled={signInForm.formState.isSubmitting} className="btn w-full">{signInForm.formState.isSubmitting ? 'Signing in…' : 'Sign In'}</button>
            </form>
          ) : (
            <form onSubmit={signUpForm.handleSubmit(onSubmitSignUp)} className="space-y-3">
              <div>
                <label className="mb-1 block text-sm font-medium">Full name</label>
                <input {...signUpForm.register('name')} className="w-full rounded-md border bg-slate-50 px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {signUpForm.formState.errors.name && <p className="mt-1 text-sm text-red-600">{signUpForm.formState.errors.name.message}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Email</label>
                <input type="email" {...signUpForm.register('email')} className="w-full rounded-md border bg-slate-50 px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {signUpForm.formState.errors.email && <p className="mt-1 text-sm text-red-600">{signUpForm.formState.errors.email.message}</p>}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">Password</label>
                  <input type="password" {...signUpForm.register('password')} className="w-full rounded-md border bg-slate-50 px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  {signUpForm.formState.errors.password && <p className="mt-1 text-sm text-red-600">{signUpForm.formState.errors.password.message}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Confirm</label>
                  <input type="password" {...signUpForm.register('confirm')} className="w-full rounded-md border bg-slate-50 px-3 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  {signUpForm.formState.errors.confirm && <p className="mt-1 text-sm text-red-600">{signUpForm.formState.errors.confirm.message}</p>}
                </div>
              </div>
              <button type="submit" disabled={signUpForm.formState.isSubmitting} className="btn w-full">{signUpForm.formState.isSubmitting ? 'Creating…' : 'Create account'}</button>
            </form>
          )}

          <div className="mt-5 text-center text-sm text-gray-600">
            {tab === 'signin' ? (
              <span>Chưa có tài khoản? <button onClick={() => setTab('signup')} className="text-blue-600 hover:underline">Đăng ký</button></span>
            ) : (
              <span>Đã có tài khoản? <button onClick={() => setTab('signin')} className="text-blue-600 hover:underline">Đăng nhập</button></span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage


