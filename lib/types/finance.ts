export interface Currency {
  name: string
  buy: number
  sell: number | null
  variation: number
}

export interface Stock {
  name: string
  location: string
  points: number
  variation: number
}

export interface Bitcoin {
  name: string
  format: [string, string]
  last: number
  buy: number | null
  sell: number | null
  variation: number
}

export interface Tax {
  date: string
  cdi: number
  selic: number
  daily_factor: number
  selic_daily: number
  cdi_daily: number
}

export interface FinanceData {
  currencies: {
    [key: string]: Currency | string
  }
  stocks: {
    [key: string]: Stock
  }
  bitcoin: {
    [key: string]: Bitcoin
  }
  taxes: Tax[]
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
  bitcoin: {
    blockchain_info: {
      name: string
      format: string[]
      last: number
      variation: number
    }
  }
  available_sources: string[]
  taxes: []
}

export interface AssetData {
  name: string
  symbol: string
  price: number
  variation: number
}

export interface PricePoint {
  timestamp: number
  price: number
}
