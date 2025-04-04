import { Bitcoin } from '@/lib/types/finance'
import { FinanceCard } from '@/components/ui/finance-card'

interface BitcoinCardProps {
  bitcoin: Bitcoin
  symbol: string
}

export function BitcoinCard({ bitcoin, symbol }: BitcoinCardProps) {
  return (
    <FinanceCard
      category='Preço de Criptomoedas'
      title={bitcoin.name}
      price={bitcoin.last}
      variation={bitcoin.variation}
      symbol={symbol}
    />
  )
}
