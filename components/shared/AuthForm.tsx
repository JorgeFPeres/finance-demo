'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
import { signIn, registerUser } from '@/lib/auth'
import Link from 'next/link'

type AuthFormData = {
  email: string
  password: string
}

export function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = useForm<AuthFormData>()

  const router = useRouter()
  const pathname = usePathname()
  const isLogin = pathname === '/login'
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = (data: AuthFormData) => {
    const { email, password } = data

    if (isLogin) {
      const success = signIn(email, password)
      if (!success) {
        setErrorMessage('Invalid credentials')
        return
      }
      router.push('/dashboard')
    } else {
      const success = registerUser({ email, password })
      if (!success) {
        setErrorMessage('Email already registered')
        return
      }
      router.push('/login')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <h1 className='text-2xl font-semibold text-center'>
        {isLogin ? 'Login' : 'Register'}
      </h1>

      <Input {...register('email')} placeholder='Email' type='email' required />
      <Input
        {...register('password')}
        placeholder='Password'
        type='password'
        required
      />

      {errorMessage && (
        <p className='text-red-500 text-sm text-center'>{errorMessage}</p>
      )}

      <Button type='submit' className='w-full' disabled={isSubmitting}>
        {isSubmitting ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
      </Button>

      <div className='text-center text-sm mt-4'>
        {isLogin ? (
          <>
            Don’t have an account?{' '}
            <Link href='/register' className='text-blue-600 hover:underline'>
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link href='/login' className='text-blue-600 hover:underline'>
              Login
            </Link>
          </>
        )}
      </div>
    </form>
  )
}
