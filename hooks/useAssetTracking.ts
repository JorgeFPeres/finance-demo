import { useState, useEffect } from 'react'
import { PricePoint, AssetData, FinanceApiResponse } from '@/types/finance'

const API_KEY = process.env.NEXT_PUBLIC_HG_FINANCE_API_KEY
const BASE_URL = 'https://api.hgbrasil.com/finance/quotations'

export function useAssetTracking(symbol: string) {
  const [priceHistory, setPriceHistory] = useState<PricePoint[]>([])
  const [currentData, setCurrentData] = useState<AssetData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    const fetchData = async () => {
      try {
        if (!API_KEY) {
          throw new Error('Chave da API não configurada')
        }

        const url = `${BASE_URL}?key=${API_KEY}&format=json-cors&fields=only_results,currencies,stocks,bitcoin`
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error('Falha ao buscar dados financeiros')
        }

        const data: FinanceApiResponse = await response.json()
        let assetData: AssetData | null = null

        // Procura nos diferentes tipos de ativos
        if (
          symbol.includes('USD') ||
          symbol.includes('EUR') ||
          symbol.includes('GBP') ||
          symbol.includes('ARS') ||
          symbol.includes('BTC')
        ) {
          const currency =
            data.currencies[symbol as keyof typeof data.currencies]
          if (currency) {
            assetData = {
              name: currency.name,
              symbol,
              price: currency.buy,
              variation: currency.variation,
            }
          }
        } else if (symbol === 'BITCOIN') {
          const bitcoin = data.bitcoin.blockchain_info
          assetData = {
            name: bitcoin.name,
            symbol: 'BITCOIN',
            price: bitcoin.last,
            variation: bitcoin.variation,
          }
        } else {
          const stock = data.stocks[symbol as keyof typeof data.stocks]
          if (stock) {
            assetData = {
              name: stock.name,
              symbol,
              price: stock.points,
              variation: stock.variation,
            }
          }
        }

        if (!assetData) {
          throw new Error('Ativo não encontrado')
        }

        setCurrentData(assetData)
        setPriceHistory((prev) => [
          ...prev,
          {
            timestamp: Date.now(),
            price: assetData.price,
          },
        ])
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao buscar dados')
      } finally {
        setIsLoading(false)
      }
    }

    // Busca inicial
    fetchData()

    // Configura o intervalo para buscar dados a cada 60 segundos
    intervalId = setInterval(fetchData, 60000)

    // Limpa o intervalo quando o componente é desmontado
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [symbol])

  return {
    priceHistory,
    currentData,
    error,
    isLoading,
  }
}
