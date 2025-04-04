'use client'

import { useFinanceData } from '@/hooks/useFinanceData'
import { Currency } from '@/lib/types/finance'

export default function Dashboard() {
  const { data, isLoading, error } = useFinanceData()

  if (isLoading) return <div>Carregando...</div>
  if (error)
    return <div>Erro ao carregar dados financeiros: {error.message}</div>
  if (!data) return <div>Nenhum dado disponível</div>

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Cotações</h1>

      <div className='grid grid-cols-2 gap-4'>
        {Object.entries(data.currencies).map(([key, currency]) => {
          if (key === 'source') return null
          const typedCurrency = currency as Currency
          return (
            <div key={key} className='border rounded-xl p-4 shadow'>
              <h2 className='font-semibold'>{typedCurrency.name}</h2>
              <p>Compra: {typedCurrency.buy}</p>
              <p>Venda: {typedCurrency.sell ?? 'N/A'}</p>
              <p>Variação: {typedCurrency.variation}%</p>
            </div>
          )
        })}
      </div>

      <h2 className='text-xl font-bold mt-8'>Ações</h2>
      <div className='grid grid-cols-2 gap-4 mt-2'>
        {Object.entries(data.stocks).map(([key, stock]) => (
          <div key={key} className='border rounded-xl p-4 shadow'>
            <h3 className='font-semibold'>{stock.name}</h3>
            <p>Local: {stock.location}</p>
            <p>Pontos: {stock.points}</p>
            <p>Variação: {stock.variation}%</p>
          </div>
        ))}
      </div>

      <h2 className='text-xl font-bold mt-8'>Bitcoin</h2>
      <div className='grid grid-cols-2 gap-4 mt-2'>
        {Object.entries(data.bitcoin).map(([key, btc]) => (
          <div key={key} className='border rounded-xl p-4 shadow'>
            <h3 className='font-semibold'>{btc.name}</h3>
            <p>Último: {btc.last}</p>
            <p>Compra: {btc.buy ?? 'N/A'}</p>
            <p>Venda: {btc.sell ?? 'N/A'}</p>
            <p>Variação: {btc.variation}%</p>
          </div>
        ))}
      </div>

      <h2 className='text-xl font-bold mt-8'>Taxas</h2>
      <div className='grid grid-cols-2 gap-4 mt-2'>
        <div className='border rounded-xl p-4 shadow'>
          <h3 className='font-semibold'>CDI</h3>
          <p>Taxa: {data.taxes.cdi}%</p>
          <p>Taxa Diária: {data.taxes.cdi_daily}%</p>
        </div>
        <div className='border rounded-xl p-4 shadow'>
          <h3 className='font-semibold'>SELIC</h3>
          <p>Taxa: {data.taxes.selic}%</p>
          <p>Taxa Diária: {data.taxes.selic_daily}%</p>
        </div>
      </div>
    </div>
  )
}
