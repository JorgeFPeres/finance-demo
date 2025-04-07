import { useState, useEffect } from 'react'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const checkAuth = () => {
      const auth = document.cookie.includes('auth=true')
      setIsAuthenticated(auth)
      setIsLoading(false)
    }

    checkAuth()

    const interval = setInterval(checkAuth, 1000)

    return () => clearInterval(interval)
  }, [])

  const login = () => {
    document.cookie = 'auth=true; path=/; max-age=86400' // 24 horas
    document.cookie = `lastActivity=${new Date().toISOString()}; path=/; max-age=86400`
    setIsAuthenticated(true)
  }

  const logout = () => {
    document.cookie = 'auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    document.cookie =
      'lastActivity=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    setIsAuthenticated(false)
  }

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
  }
}
