import { Stock } from '@/lib/types/finance'
import { FinanceCard } from '@/components/ui/finance-card'

interface StockCardProps {
  stock: Stock
  symbol: string
}

export function StockCard({ stock, symbol }: StockCardProps) {
  return (
    <FinanceCard
      category='Preço de Ações'
      title={stock.name}
      price={stock.points}
      variation={stock.variation}
      symbol={symbol}
    />
  )
}
