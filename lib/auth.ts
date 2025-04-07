'use client'

export const USERS_KEY = 'users'

interface User {
  email: string
  password: string
}

interface Session {
  email: string
  lastActivity: string
}

export const AUTH_COOKIE_NAME = 'auth'
export const LAST_ACTIVITY_COOKIE_NAME = 'lastActivity'
export const SESSION_KEY = 'session'

export function registerUser(user: User): boolean {
  const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')

  const userExists = users.some((u) => u.email === user.email)
  if (userExists) return false

  users.push(user)
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  return true
}

export async function signIn(
  email: string,
  password: string
): Promise<boolean> {
  try {
    const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) return false

    const now = new Date().toISOString()

    document.cookie = `${AUTH_COOKIE_NAME}=true; path=/; sameSite=strict`
    document.cookie = `${LAST_ACTIVITY_COOKIE_NAME}=${now}; path=/; sameSite=strict`

    const session: Session = {
      email,
      lastActivity: now,
    }
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))

    return true
  } catch (error) {
    console.error('Erro ao fazer login:', error)
    return false
  }
}

export function getSession(): Session | null {
  try {
    const sessionData = sessionStorage.getItem(SESSION_KEY)
    if (!sessionData) return null

    return JSON.parse(sessionData)
  } catch (error) {
    console.error('Erro ao ler sessão:', error)
    return null
  }
}

export function updateSessionActivity() {
  try {
    const session = getSession()
    if (!session) return

    session.lastActivity = new Date().toISOString()
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
  } catch (error) {
    console.error('Erro ao atualizar atividade:', error)
  }
}

export async function clearSession(): Promise<void> {
  try {
    sessionStorage.removeItem(SESSION_KEY)

    document.cookie = `${AUTH_COOKIE_NAME}=; Max-Age=0; path=/`
    document.cookie = `${LAST_ACTIVITY_COOKIE_NAME}=; Max-Age=0; path=/`

    if (sessionStorage.getItem(SESSION_KEY)) {
      sessionStorage.clear()
    }
  } catch (error) {
    console.error('Erro ao limpar sessão:', error)
  }
}
