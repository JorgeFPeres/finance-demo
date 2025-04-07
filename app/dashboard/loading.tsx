import { Skeleton } from '@/components/ui/skeleton'
import { SectionHeader } from '@/components/ui/section-header'

export default function Loading() {
  return (
    <div className='p-6 space-y-12 mx-auto container'>
      <div>
        <SectionHeader
          title='Ativos Financeiros'
          subtitle='Acompanhe as principais cotações de moedas e ações em tempo real'
        />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className='rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-4'
            >
              <div className='flex items-center justify-between'>
                <Skeleton className='h-6 w-24' />
                <Skeleton className='h-6 w-16' />
              </div>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-3/4' />
              </div>
              <div className='flex items-center justify-between'>
                <Skeleton className='h-6 w-20' />
                <Skeleton className='h-6 w-16' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
