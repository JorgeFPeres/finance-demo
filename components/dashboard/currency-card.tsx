import { Currency } from '@/lib/types/finance'
import { FinanceCard } from '@/components/ui/finance-card'

interface CurrencyCardProps {
  currency: Currency
  symbol: string
}

export function CurrencyCard({ currency, symbol }: CurrencyCardProps) {
  return (
    <FinanceCard
      category='Preço de Moedas'
      title={currency.name}
      price={currency.buy}
      variation={currency.variation}
      symbol={symbol}
    />
  )
}
