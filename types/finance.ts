export interface PricePoint {
  timestamp: number
  price: number
}

export interface AssetData {
  name: string
  symbol: string
  price: number
  variation: number
}

export interface Currency {
  name: string
  buy: number
  sell: number
  variation: number
}

export interface Stock {
  name: string
  location: string
  points: number
  variation: number
}

export interface Bitcoin {
  blockchain_info: {
    name: string
    format: string[]
    last: number
    variation: number
  }
}

export interface FinanceApiResponse {
  currencies: {
    USD: Currency
    EUR: Currency
    GBP: Currency
    ARS: Currency
    BTC: Currency
  }
  stocks: {
    IBOVESPA: Stock
    IFIX: Stock
    NASDAQ: Stock
    DOWJONES: Stock
    CAC: Stock
    NIKKEI: Stock
  }
  bitcoin: Bitcoin
  available_sources: string[]
  taxes: []
}
