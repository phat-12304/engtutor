import { Api } from '../shared/api'
import { useUserStore } from '../shared/store'

export function useAuth() {
  const setUser = useUserStore((s) => s.setUser)
  const logout = useUserStore((s) => s.logout)

  const login = async (payload: { email: string; password: string }) => {
    const { data } = await Api.auth.login(payload)
    const u = data.data
    setUser({
      id: u.id,
      email: u.email,
      name: u.name,
      image: u.image,
      image_url: u.image_url,
    })
  }

  const register = async (payload: { email: string; password: string }) => {
    await Api.auth.register(payload)
  }

  return { login, register, logout }
}
