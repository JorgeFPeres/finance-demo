import { signOut } from '@/lib/auth'

export default function DashboardPage() {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold mb-4'>Dashboard</h1>
      <button
        onClick={signOut}
        className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'
      >
        Logout
      </button>
    </div>
  )
}
