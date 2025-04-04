'use client'

import { useParams, useRouter } from 'next/navigation'
import { SectionHeader } from '@/components/ui/section-header'
import { ArrowLeft } from 'lucide-react'

export default function DetailsPage() {
  const params = useParams()
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div className='container mx-auto p-6'>
      <div className='flex items-start gap-4 '>
        <button
          onClick={handleBack}
          className='mt-4 text-primary hover:text-primary/70 transition-colors cursor-pointer'
          aria-label='Voltar para página anterior pointer'
        >
          <ArrowLeft size={24} />
        </button>
        <SectionHeader
          title='Detalhes'
          subtitle={`Informações detalhadas sobre ${decodeURIComponent(
            params.symbol as string
          )}`}
        />
      </div>
    </div>
  )
}
