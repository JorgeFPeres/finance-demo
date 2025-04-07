'use client'

import { useState } from 'react'
import { useFinanceData } from '@/hooks/useFinanceData'
import { Currency, Stock } from '@/lib/types/finance'
import { CurrencyCard } from '@/components/dashboard/currency-card'
import { StockCard } from '@/components/dashboard/stock-card'
import { SectionHeader } from '@/components/ui/section-header'
import { Button } from '@/components/ui/button'
import Loading from './loading'
import Error from '../error'

type FinanceItem =
  | { type: 'currency'; key: string; value: Currency }
  | { type: 'stock'; key: string; value: Stock }

export default function Dashboard() {
  const { data, isLoading, error } = useFinanceData()
  const [visibleItems, setVisibleItems] = useState(10)

  if (isLoading) return <Loading />
  if (error) return <Error />

  const allItems: FinanceItem[] = [
    ...Object.entries(data?.currencies ?? {})
      .filter(([key]) => key !== 'source')
      .map(([key, value]) => ({
        type: 'currency' as const,
        key,
        value: value as Currency,
      })),
    ...Object.entries(data?.stocks ?? {}).map(([key, value]) => ({
      type: 'stock' as const,
      key,
      value: value as Stock,
    })),
  ]

  const showMoreItems = () => {
    setVisibleItems((prev) => prev + 10)
  }

  const visibleAssets = allItems.slice(0, visibleItems)
  const hasMoreItems = visibleItems < allItems.length

  return (
    <div className='p-6 space-y-12 mx-auto container'>
      <div>
        <SectionHeader
          title='Ativos Financeiros'
          subtitle='Acompanhe as principais cotações de moedas e ações em tempo real'
        />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {visibleAssets.map((item) =>
            item.type === 'currency' ? (
              <CurrencyCard
                key={item.key}
                symbol={item.key}
                currency={item.value}
              />
            ) : (
              <StockCard key={item.key} symbol={item.key} stock={item.value} />
            )
          )}
        </div>

        {hasMoreItems && (
          <div className='flex justify-center mt-8'>
            <Button
              onClick={showMoreItems}
              variant='outline'
              className='w-full max-w-xs'
            >
              Ver mais
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
