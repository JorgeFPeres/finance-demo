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

  const token = generateToken()
  localStorage.setItem(TOKEN_KEY, token)
  return true
}

function generateToken() {
  return Math.random().toString(36).substring(2)
}
