import { AuthForm } from '@/components/shared/AuthForm'

export default function RegisterPage() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 p-4'>
      <div className='bg-white shadow-xl rounded-xl p-8 w-full max-w-md'>
        <AuthForm />
      </div>
    </div>
  )
}
