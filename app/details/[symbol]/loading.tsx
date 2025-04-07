import { Skeleton } from '@/components/ui/skeleton'
import { SectionHeader } from '@/components/ui/section-header'
import { ArrowLeft } from 'lucide-react'

export default function Loading() {
  return (
    <div className='container mx-auto p-6'>
      <div className='flex items-start gap-4 mb-8'>
        <Skeleton className='h-6 w-6 rounded-full' />
        <div className='space-y-2'>
          <Skeleton className='h-8 w-48' />
          <Skeleton className='h-4 w-64' />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
        <div className='rounded-lg border bg-card text-card-foreground shadow-sm p-6'>
          <div className='flex items-center justify-between mb-2'>
            <Skeleton className='h-6 w-32' />
            <Skeleton className='h-4 w-12' />
          </div>
          <div className='space-y-1'>
            <Skeleton className='h-8 w-40' />
            <Skeleton className='h-4 w-48' />
          </div>
        </div>

        <div className='rounded-lg border bg-card text-card-foreground shadow-sm p-6'>
          <div className='flex items-center justify-between mb-2'>
            <Skeleton className='h-6 w-32' />
            <Skeleton className='h-4 w-12' />
          </div>
          <div className='space-y-1'>
            <Skeleton className='h-8 w-40' />
            <Skeleton className='h-4 w-48' />
          </div>
        </div>
      </div>

      <div className='rounded-lg border bg-card text-card-foreground shadow-sm p-6'>
        <div className='flex items-center justify-between mb-4'>
          <Skeleton className='h-6 w-40' />
          <Skeleton className='h-4 w-24' />
        </div>
        <div className='h-[400px]'>
          <div className='relative h-full'>
            <Skeleton className='absolute inset-0' />
            <div className='absolute bottom-0 left-0 right-0 flex justify-between px-4'>
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className='h-4 w-16' />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
