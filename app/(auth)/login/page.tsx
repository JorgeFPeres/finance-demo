import { AuthForm } from '@/components/shared/AuthForm'

export default function LoginPage() {
  return (
    <div className='flex-1 flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-card border rounded-xl p-8 shadow-lg'>
        <AuthForm />
      </div>
    </div>
  )
}
