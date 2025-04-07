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
      if (!session) {
        setUserEmail(null)
        return
      }

      const hasAuthCookie = document.cookie
        .split('; ')
        .some((row) => row.startsWith('auth=true'))

      if (!hasAuthCookie && session) {
        clearSession()
        setUserEmail(null)
        return
      }

      setUserEmail(session?.email || null)
    }

    const updateActivity = () => {
      const session = getSession()
      if (session) {
        updateSessionActivity()
      }
    }

    const checkInactivity = async () => {
      const session = getSession()
      if (!session) return

      const lastActivity = session.lastActivity

      if (lastActivity) {
        const last = new Date(lastActivity)
        const now = new Date()
        const diffMs = now.getTime() - last.getTime()
        const diffMin = diffMs / (1000 * 60)

        if (diffMin > 5) {
          try {
            await clearSession()
            setUserEmail(null)
            router.refresh()
          } catch (error) {
            console.error('Erro ao fazer logout:', error)
          }
        }
      }
    }

    checkSession()
    updateActivity()

    const sessionCheckInterval = setInterval(checkSession, 10000)
    const inactivityCheckInterval = setInterval(checkInactivity, 10000)

    window.addEventListener('keydown', updateActivity)
    window.addEventListener('click', updateActivity)

    return () => {
      window.removeEventListener('keydown', updateActivity)
      window.removeEventListener('click', updateActivity)
      clearInterval(sessionCheckInterval)
      clearInterval(inactivityCheckInterval)
    }
  }, [])

  const handleLogout = async () => {
    try {
      await clearSession()
      setUserEmail(null)
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
