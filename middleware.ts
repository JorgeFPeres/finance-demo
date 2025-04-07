import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/login', '/register']
const AUTH_COOKIE_NAME = 'auth'
const LAST_ACTIVITY_COOKIE_NAME = 'lastActivity'
const MAX_INACTIVITY_MINUTES = 1

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublic = publicRoutes.includes(pathname)
  const isRoot = pathname === '/'

  const auth = request.cookies.get(AUTH_COOKIE_NAME)?.value === 'true'
  const lastActivity = request.cookies.get(LAST_ACTIVITY_COOKIE_NAME)?.value

  if (isRoot) {
    if (auth) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    } else {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  if (!auth && !isPublic) {
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete(AUTH_COOKIE_NAME)
    response.cookies.delete(LAST_ACTIVITY_COOKIE_NAME)
    return response
  }

  if (auth && isPublic) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (auth && lastActivity) {
    console.log('lastActivity', lastActivity)
    const last = new Date(lastActivity)
    const now = new Date()
    const diffMs = now.getTime() - last.getTime()
    const diffMin = diffMs / (1000 * 60)

    if (diffMin > MAX_INACTIVITY_MINUTES) {
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete(AUTH_COOKIE_NAME)
      response.cookies.delete(LAST_ACTIVITY_COOKIE_NAME)
      response.cookies.set(LAST_ACTIVITY_COOKIE_NAME, '', {
        path: '/',
        expires: new Date(0),
        maxAge: 0,
      })
      return response
    }
  }

  if (auth) {
    const response = NextResponse.next()
    response.cookies.set(LAST_ACTIVITY_COOKIE_NAME, new Date().toISOString(), {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/login', '/register', '/details/:path*'],
}
