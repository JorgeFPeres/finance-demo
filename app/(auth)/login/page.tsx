import { AuthForm } from '@/components/shared/LoginForm'

export default function LoginPage() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 p-4'>
      <div className='bg-white shadow-xl rounded-xl p-8 w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-6 text-center'>Franq Login</h1>
        <AuthForm />
      </div>
    </div>
  )
}
