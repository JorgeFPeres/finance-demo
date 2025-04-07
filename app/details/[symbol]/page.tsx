'use client'

import { useParams, useRouter } from 'next/navigation'
import { SectionHeader } from '@/components/ui/section-header'
import { ArrowLeft } from 'lucide-react'
import { useAssetTracking } from '@/hooks/useAssetTracking'
import { PriceChart } from '@/components/ui/price-chart'
import Error from '../../error'
import Loading from './loading'

export default function DetailsPage() {
  const params = useParams()
  const router = useRouter()
  const symbol = decodeURIComponent(params.symbol as string)

  const { priceHistory, currentData, error, isLoading } =
    useAssetTracking(symbol)

  const handleBack = () => {
    router.back()
  }

  if (isLoading) return <Loading />

  if (error) return <Error />

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
      <div className='flex items-start gap-4  '>
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
        <div className='rounded-lg border bg-[#2b2b2b] text-white shadow-sm p-6'>
          <div className='flex items-center justify-between mb-2'>
            <h3 className='text-lg font-medium'>Preço Atual</h3>
          </div>
          <div className='space-y-1'>
            <p className='text-2xl font-bold'>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(currentData.price)}
            </p>
            <p className='text-sm text-white'>
              Última atualização: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>

        <div className='rounded-lg border bg-[#2b2b2b] text-white  shadow-sm p-6'>
          <div className='flex items-center justify-between mb-2'>
            <h3 className='text-lg font-medium'>Variação</h3>
          </div>
          <div className='space-y-1'>
            <p
              className={`text-2xl font-bold ${
                currentData.variation >= 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {currentData.variation >= 0 ? '+' : ''}
              {currentData.variation.toFixed(2)}%
            </p>
            <p className='text-sm text-white'>Em relação ao dia anterior</p>
          </div>
        </div>
      </div>

      <div className='rounded-lg border bg-[#2b2b2b] text-white shadow-sm p-6'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-medium'>Evolução do Preço</h3>
        </div>
        <div className='h-[400px]'>
          <PriceChart
            data={priceHistory}
            isPositive={currentData.variation >= 0}
          />
        </div>
      </div>
    </div>
  )
}
