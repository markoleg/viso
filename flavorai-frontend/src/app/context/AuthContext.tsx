'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { getToken, logout as clear } from '@/app/lib/auth'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext({ isAuth: false, login: () => {}, logout: () => {} })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState(false)

  const login = () => setIsAuth(true)
  const logout = () => {
    clear()
    setIsAuth(false)
  }

  useEffect(() => {
    const token = getToken()
    if (token) {
      try {
        const decoded: any = jwtDecode(token)
        if (decoded.exp * 1000 > Date.now()) {
          setIsAuth(true)
        }
      } catch {}
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
