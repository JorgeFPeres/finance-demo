'use client'

import { useParams, useRouter } from 'next/navigation'
import { SectionHeader } from '@/components/ui/section-header'
import { ArrowLeft } from 'lucide-react'
import { useAssetTracking } from '@/hooks/useAssetTracking'
import { PriceChart } from '@/components/ui/price-chart'

export default function DetailsPage() {
  const params = useParams()
  const router = useRouter()
  const symbol = decodeURIComponent(params.symbol as string)

  const { priceHistory, currentData, error, isLoading } =
    useAssetTracking(symbol)

  const handleBack = () => {
    router.back()
  }

  if (isLoading) {
    return (
      <div className='container mx-auto p-6'>
        <div className='flex items-center justify-center min-h-[400px]'>
          <p className='text-muted-foreground'>Carregando...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='container mx-auto p-6'>
        <div className='flex items-center justify-center min-h-[400px]'>
          <p className='text-red-500'>{error}</p>
        </div>
      </div>
    )
  }

  if (!currentData) {
    return (
      <div className='container mx-auto p-6'>
        <div className='flex items-center justify-center min-h-[400px]'>
          <p className='text-muted-foreground'>Nenhum dado disponível</p>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto p-6'>
      <div className='flex items-start gap-4 mb-8'>
        <button
          onClick={handleBack}
          className='text-primary hover:text-primary/80 transition-colors mt-1'
          aria-label='Voltar para página anterior'
        >
          <ArrowLeft size={24} />
        </button>
        <SectionHeader
          title={currentData.name}
          subtitle={`Acompanhamento em tempo real do ${currentData.symbol}`}
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
        <div className='bg-card border rounded-lg p-6'>
          <h3 className='text-lg font-medium mb-2'>Preço Atual</h3>
          <p className='text-2xl font-bold'>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(currentData.price)}
          </p>
        </div>
        <div className='bg-card border rounded-lg p-6'>
          <h3 className='text-lg font-medium mb-2'>Variação</h3>
          <p
            className={`text-2xl font-bold ${
              currentData.variation >= 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {currentData.variation >= 0 ? '+' : ''}
            {currentData.variation.toFixed(2)}%
          </p>
        </div>
      </div>

      {priceHistory.length > 0 && (
        <div className='bg-card border rounded-lg p-6'>
          <h3 className='text-lg font-medium mb-4'>Evolução do Preço</h3>
          <PriceChart
            data={priceHistory}
            isPositive={currentData.variation >= 0}
          />
        </div>
      )}
    </div>
  )
}
