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
  taxes: Tax
}
