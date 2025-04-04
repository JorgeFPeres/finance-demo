'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { signIn } from '@/lib/auth'

type FormValues = {
  email: string
  password: string
}

export function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>()

  const [formError, setFormError] = useState<string | null>(null)
  const router = useRouter()

  const onSubmit = async (data: FormValues) => {
    setFormError(null)

    try {
      const success = await signIn(data.email, data.password)

      if (!success) {
        setFormError('Invalid credentials')
        return
      }

      router.push('/dashboard')
    } catch (error) {
      setFormError('Something went wrong')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 max-w-sm w-full'
    >
      <div>
        <Input
          type='email'
          placeholder='Email'
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && (
          <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input
          type='password'
          placeholder='Password'
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && (
          <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>
        )}
      </div>

      {formError && <p className='text-red-500 text-sm'>{formError}</p>}

      <Button type='submit' className='w-full' disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </Button>

      <div className='text-center text-sm mt-4'>
        Don’t have an account?{' '}
        <Link href='/register' className='text-blue-600 hover:underline'>
          Sign up
        </Link>
      </div>
    </form>
  )
}
