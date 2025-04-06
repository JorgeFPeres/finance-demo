import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface PricePoint {
  timestamp: number
  price: number
  variation: number
}

interface PriceChartProps {
  data: PricePoint[]
  isPositive: boolean
}

export function PriceChart({ data, isPositive }: PriceChartProps) {
  const formattedData = data.map((point) => ({
    ...point,
    time: format(point.timestamp, 'HH:mm:ss', { locale: ptBR }),
  }))

  const lineColor = isPositive ? '#22c55e' : '#ef4444'

  return (
    <div className='w-full h-[400px] mt-6'>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray='3 3' stroke='#333' />
          <XAxis dataKey='time' stroke='#666' tick={{ fill: '#666' }} />
          <YAxis
            stroke='#666'
            tick={{ fill: '#666' }}
            domain={['auto', 'auto']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1a1a1a',
              border: '1px solid #333',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#666' }}
          />
          <Line
            type='monotone'
            dataKey='price'
            stroke={lineColor}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
