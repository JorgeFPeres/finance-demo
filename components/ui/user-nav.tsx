import { LogOut, User } from 'lucide-react'

interface UserNavProps {
  email: string
  onLogout: () => void
}

export function UserNav({ email, onLogout }: UserNavProps) {
  return (
    <div className='flex items-center gap-4'>
      <div className='flex items-center gap-2'>
        <div className='bg-indigo-300 w-8 h-8 rounded-full flex items-center justify-center'>
          <User size={16} className='text-primary' />
        </div>
        <span className='text-sm cursor-default font-medium'>{email}</span>
      </div>
      <button
        onClick={onLogout}
        className='flex cursor-pointer items-center gap-2 text-sm text-p hover:text-indigo-500 transition-colors'
      >
        <LogOut size={16} />
        <span>Sair</span>
      </button>
    </div>
  )
}
