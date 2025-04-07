'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
import { signIn, registerUser } from '@/lib/auth'
import Link from 'next/link'
import { toast } from 'sonner'

interface AuthFormData {
  email: string
  password: string
}

export function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AuthFormData>()

  const router = useRouter()
  const pathname = usePathname()
  const isLogin = pathname === '/login'
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async (data: AuthFormData) => {
    try {
      const { email, password } = data
      setErrorMessage('')

      if (isLogin) {
        const success = await signIn(email, password)
        if (!success) {
          setErrorMessage('Credenciais inválidas')
          return
        }

        await new Promise((resolve) => setTimeout(resolve, 50))

        window.location.replace('/dashboard')
      } else {
        const success = registerUser({ email, password })
        if (!success) {
          setErrorMessage('Email já registrado')
          return
        }
        toast.success(
          'Cadastro realizado com sucesso! Faça seu login para continuar.',
          {
            duration: 4000,
          }
        )
        router.push('/login')
      }
    } catch (error) {
      console.error('Erro na autenticação:', error)
      setErrorMessage('Ocorreu um erro. Tente novamente.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <h1 className='text-2xl font-semibold text-center'>
        {isLogin ? 'Login' : 'Cadastro'}
      </h1>

      <Input {...register('email')} placeholder='Email' type='email' required />
      <Input
        {...register('password')}
        placeholder='Senha'
        type='password'
        required
      />

      {errorMessage && (
        <p className='text-red-500 text-sm text-center'>{errorMessage}</p>
      )}

      <Button
        type='submit'
        className='w-full bg-indigo-400 text-white hover:bg-indigo-500'
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Aguarde...' : isLogin ? 'Entrar' : 'Cadastrar'}
      </Button>

      <div className='text-center text-sm mt-4'>
        {isLogin ? (
          <>
            Não tem uma conta?{' '}
            <Link href='/register' className='text-indigo-400 hover:underline'>
              Cadastre-se
            </Link>
          </>
        ) : (
          <>
            Já tem uma conta?{' '}
            <Link href='/login' className='text-indigo-400 hover:underline'>
              Faça login
            </Link>
          </>
        )}
      </div>
    </form>
  )
}
