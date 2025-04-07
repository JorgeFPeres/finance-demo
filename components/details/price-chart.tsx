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
          <CartesianGrid strokeDasharray='3 3' stroke='#FFF' />
          <XAxis dataKey='time' stroke='#FFF' tick={{ fill: '#FFF' }} />
          <YAxis
            stroke='#FFF'
            tick={{ fill: '#FFF' }}
            domain={['auto', 'auto']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1a1a1a',
              border: '1px solid #FFF',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#FFF' }}
          />
          <Line
            type='linear'
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
