'use client'

import { useFinanceData } from '@/hooks/useFinanceData'
import { Currency } from '@/lib/types/finance'
import { CurrencyCard } from '@/components/dashboard/currency-card'
import { StockCard } from '@/components/dashboard/stock-card'
import { SectionHeader } from '@/components/ui/section-header'

export default function Dashboard() {
  const { data, isLoading, error } = useFinanceData()

  if (isLoading)
    return (
      <div className='flex min-h-[80vh] items-center justify-center'>
        <div className='text-primary animate-pulse'>Carregando...</div>
      </div>
    )

  if (error)
    return (
      <div className='flex min-h-[80vh]  items-center justify-center'>
        <div className='text-destructive'>
          Erro ao carregar dados financeiros: {error.message}
        </div>
      </div>
    )

  if (!data)
    return (
      <div className='flex min-h-[80vh] items-center justify-center'>
        <div className='text-muted-foreground'>Nenhum dado disponível</div>
      </div>
    )

  return (
    <div className='p-6 space-y-12 mx-auto container'>
      <div>
        <SectionHeader
          title='Cotações de Moedas'
          subtitle='Acompanhe as principais cotações de moedas em tempo real'
        />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {Object.entries(data.currencies).map(([key, currency]) => {
            if (key === 'source') return null
            return (
              <CurrencyCard
                key={key}
                symbol={key}
                currency={currency as Currency}
              />
            )
          })}
        </div>
      </div>

      <div>
        <SectionHeader
          title='Mercado de Ações'
          subtitle='Principais índices e ações do mercado financeiro'
        />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {Object.entries(data.stocks).map(([key, stock]) => (
            <StockCard key={key} symbol={key} stock={stock} />
          ))}
        </div>
      </div>
    </div>
  )
}
