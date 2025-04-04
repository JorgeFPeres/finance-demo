import Image from 'next/image'

interface FinanceCardProps {
  category: string
  title: string
  price: number
  variation: number
  symbol: string
}

export function FinanceCard({
  category,
  title,
  price,
  variation,
  symbol,
}: FinanceCardProps) {
  const isNegative = variation < 0
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price)

  const formattedVariation = `${isNegative ? '' : '+'}${variation.toFixed(2)}%`

  return (
    <div className='bg-[#2b2b2b] rounded-xl p-6 text-white'>
      <p className='text-gray-400 text-sm mb-2'>{category}</p>
      <div className='flex justify-between items-start'>
        <div>
          <h3 className='text-xl font-semibold mb-2'>{title}</h3>
          <div className='flex items-center gap-3'>
            <span className='text-xl font-bold'>{formattedPrice}</span>
            <div
              className={`flex items-center gap-2 ${
                isNegative ? 'text-red-500' : 'text-green-500'
              }`}
            >
              <div className='text-md'>{isNegative ? '↓' : '↑'}</div>
              <span>{formattedVariation}</span>
            </div>
          </div>
          <p className='text-gray-400 text-sm mt-2'>{symbol}</p>
        </div>
      </div>
    </div>
  )
}

interface DataRowProps {
  label: string
  value: string | number
  isVariation?: boolean
}

export function DataRow({ label, value, isVariation }: DataRowProps) {
  if (isVariation) {
    const numericValue = Number(value)
    const formattedValue = `${
      numericValue > 0 ? '+' : ''
    }${numericValue.toFixed(2)}%`
    return (
      <div className='flex justify-between items-center py-2'>
        <span className='text-gray-400'>{label}</span>
        <span className={numericValue > 0 ? 'text-green-500' : 'text-red-500'}>
          {formattedValue}
        </span>
      </div>
    )
  }

  return (
    <div className='flex justify-between items-center py-2'>
      <span className='text-gray-400'>{label}</span>
      <span>{value}</span>
    </div>
  )
}
