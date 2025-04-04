import { useQuery } from '@tanstack/react-query'
import { getFinanceData } from '@/lib/api/finance'
import { FinanceData } from '@/lib/types/finance'

export function useFinanceData() {
  return useQuery<FinanceData>({
    queryKey: ['finance'],
    queryFn: getFinanceData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  })
}
