'use client'

import { useFinanceData } from '@/hooks/useFinanceData'
import { Currency } from '@/lib/types/finance'

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
      <div className='flex min-h-[80vh] items-center justify-center'>
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
    <div className='container mx-auto p-6 space-y-8'>
      <div>
        <h1 className='text-3xl font-bold text-primary mb-6'>Cotações</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {Object.entries(data.currencies).map(([key, currency]) => {
            if (key === 'source') return null
            const typedCurrency = currency as Currency
            return (
              <div
                key={key}
                className='bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow'
              >
                <h2 className='text-xl font-semibold text-primary mb-3'>
                  {typedCurrency.name}
                </h2>
                <div className='space-y-2 text-card-foreground'>
                  <p className='flex justify-between'>
                    <span className='text-muted-foreground'>Compra:</span>
                    <span className='font-mono'>
                      {typedCurrency.buy.toFixed(2)}
                    </span>
                  </p>
                  <p className='flex justify-between'>
                    <span className='text-muted-foreground'>Venda:</span>
                    <span className='font-mono'>
                      {typedCurrency.sell?.toFixed(2) ?? 'N/A'}
                    </span>
                  </p>
                  <p className='flex justify-between'>
                    <span className='text-muted-foreground'>Variação:</span>
                    <span
                      className={`font-mono ${
                        typedCurrency.variation > 0
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {typedCurrency.variation > 0 ? '+' : ''}
                      {typedCurrency.variation.toFixed(2)}%
                    </span>
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div>
        <h2 className='text-2xl font-bold text-primary mb-6'>Ações</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {Object.entries(data.stocks).map(([key, stock]) => (
            <div
              key={key}
              className='bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow'
            >
              <h3 className='text-xl font-semibold text-primary mb-3'>
                {stock.name}
              </h3>
              <div className='space-y-2 text-card-foreground'>
                <p className='flex justify-between'>
                  <span className='text-muted-foreground'>Local:</span>
                  <span>{stock.location}</span>
                </p>
                <p className='flex justify-between'>
                  <span className='text-muted-foreground'>Pontos:</span>
                  <span className='font-mono'>
                    {stock.points.toLocaleString()}
                  </span>
                </p>
                <p className='flex justify-between'>
                  <span className='text-muted-foreground'>Variação:</span>
                  <span
                    className={`font-mono ${
                      stock.variation > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stock.variation > 0 ? '+' : ''}
                    {stock.variation.toFixed(2)}%
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-2xl font-bold text-primary mb-6'>Bitcoin</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {Object.entries(data.bitcoin).map(([key, btc]) => (
            <div
              key={key}
              className='bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow'
            >
              <h3 className='text-xl font-semibold text-primary mb-3'>
                {btc.name}
              </h3>
              <div className='space-y-2 text-card-foreground'>
                <p className='flex justify-between'>
                  <span className='text-muted-foreground'>Último:</span>
                  <span className='font-mono'>{btc.last.toLocaleString()}</span>
                </p>
                <p className='flex justify-between'>
                  <span className='text-muted-foreground'>Compra:</span>
                  <span className='font-mono'>
                    {btc.buy?.toLocaleString() ?? 'N/A'}
                  </span>
                </p>
                <p className='flex justify-between'>
                  <span className='text-muted-foreground'>Venda:</span>
                  <span className='font-mono'>
                    {btc.sell?.toLocaleString() ?? 'N/A'}
                  </span>
                </p>
                <p className='flex justify-between'>
                  <span className='text-muted-foreground'>Variação:</span>
                  <span
                    className={`font-mono ${
                      btc.variation > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {btc.variation > 0 ? '+' : ''}
                    {btc.variation.toFixed(2)}%
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-2xl font-bold text-primary mb-6'>Taxas</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow'>
            <h3 className='text-xl font-semibold text-primary mb-3'>CDI</h3>
            <div className='space-y-2 text-card-foreground'>
              <p className='flex justify-between'>
                <span className='text-muted-foreground'>Taxa:</span>
                <span className='font-mono'>{data.taxes.cdi?.toFixed(2)}%</span>
              </p>
              <p className='flex justify-between'>
                <span className='text-muted-foreground'>Taxa Diária:</span>
                <span className='font-mono'>
                  {data.taxes.cdi_daily?.toFixed(4)}%
                </span>
              </p>
            </div>
          </div>
          <div className='bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow'>
            <h3 className='text-xl font-semibold text-primary mb-3'>SELIC</h3>
            <div className='space-y-2 text-card-foreground'>
              <p className='flex justify-between'>
                <span className='text-muted-foreground'>Taxa:</span>
                <span className='font-mono'>
                  {data.taxes.selic?.toFixed(2)}%
                </span>
              </p>
              <p className='flex justify-between'>
                <span className='text-muted-foreground'>Taxa Diária:</span>
                <span className='font-mono'>
                  {data.taxes.selic_daily?.toFixed(4)}%
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
