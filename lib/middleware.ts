import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/auth/login', '/auth/register']

const MAX_INACTIVITY_MINUTES = 5

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublic = publicRoutes.includes(pathname)

  const auth = request.cookies.get('auth')?.value === 'true'
  const lastActivity = request.cookies.get('lastActivity')?.value

  if (!auth && !isPublic) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (auth && lastActivity) {
    const last = new Date(lastActivity)
    const now = new Date()

    const diffMs = now.getTime() - last.getTime()
    const diffMin = diffMs / (1000 * 60)

    if (diffMin > MAX_INACTIVITY_MINUTES) {
      const res = NextResponse.redirect(new URL('/auth/login', request.url))
      res.cookies.set('auth', '', { maxAge: 0, path: '/' })
      res.cookies.set('lastActivity', '', { maxAge: 0, path: '/' })
      return res
    }
  }

  if (auth) {
    const res = NextResponse.next()
    res.cookies.set('lastActivity', new Date().toISOString(), {
      path: '/',
    })
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
