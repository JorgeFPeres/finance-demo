'use client'

export const USERS_KEY = 'users'
export const TOKEN_KEY = 'session_token'

type User = {
  email: string
  password: string
}

export function registerUser(user: User): boolean {
  const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')

  const userExists = users.some((u) => u.email === user.email)
  if (userExists) return false

  users.push(user)
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  return true
}

export function signIn(email: string, password: string): boolean {
  const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')

  const user = users.find((u) => u.email === email && u.password === password)
  if (!user) return false

  document.cookie = 'auth=true; path=/'

  const now = new Date().toISOString()

  document.cookie = `auth=true; path=/`
  document.cookie = `lastActivity=${now}; path=/`

  return true
}
