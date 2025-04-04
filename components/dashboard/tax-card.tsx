import { FinanceCard } from '@/components/ui/finance-card'

interface TaxCardProps {
  title: string
  rate: number
  dailyRate: number
}

export function TaxCard({ title, rate, dailyRate }: TaxCardProps) {
  return (
    <FinanceCard
      category='Taxas'
      title={title}
      price={rate}
      variation={dailyRate}
      symbol={`${title} - Taxa Diária`}
    />
  )
}
