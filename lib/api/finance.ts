import { FinanceData } from '@/lib/types/finance'

const API_KEY = process.env.NEXT_PUBLIC_HG_FINANCE_API_KEY
const BASE_URL = 'https://api.hgbrasil.com/finance'

export async function getFinanceData(): Promise<FinanceData> {
  if (!API_KEY) {
    throw new Error('API key not configured')
  }

  const response = await fetch(`${BASE_URL}?key=${API_KEY}&format=json-cors`)

  if (!response.ok) {
    throw new Error('Error fetching finance data')
  }

  const data = await response.json()
  return data.results
}
