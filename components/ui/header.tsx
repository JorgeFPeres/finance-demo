'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { UserNav } from './user-nav'
import { getSession, clearSession, updateSessionActivity } from '@/lib/auth'

export function Header() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const checkSession = () => {
      const session = getSession()
      setUserEmail(session?.email || null)
    }

    checkSession()
    const sessionCheckInterval = setInterval(checkSession, 1000)

    const updateActivity = () => {
      updateSessionActivity()
    }

    const checkClearSession = () => {
      const clearSessionCookie = document.cookie.includes('clear_session=true')
      if (clearSessionCookie) {
        clearSession()
        setUserEmail(null)
        document.cookie =
          'clear_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        router.push('/login')
        router.refresh()
      }
    }

    window.addEventListener('keydown', updateActivity)
    window.addEventListener('click', updateActivity)

    const clearCheckInterval = setInterval(checkClearSession, 1000)

    return () => {
      window.removeEventListener('keydown', updateActivity)
      window.removeEventListener('click', updateActivity)
      clearInterval(sessionCheckInterval)
      clearInterval(clearCheckInterval)
    }
  }, [router])

  const handleLogout = async () => {
    try {
      await clearSession()
      setUserEmail(null)
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  return (
    <nav className='border-b'>
      <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
        <Link href='/' className='flex items-center space-x-2'>
          <Image
            src='/franq-logo.png'
            alt='Franq Logo'
            width={120}
            height={40}
            className='h-8 w-auto'
            priority
          />
        </Link>
        {userEmail && <UserNav email={userEmail} onLogout={handleLogout} />}
      </div>
    </nav>
  )
}
