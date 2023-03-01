export interface ChartData {
  items: ChartItem[]
  min: ChartPrice
  max: ChartPrice
}

export interface ChartItem {
  prices: ChartPrice
  date: string
}

export type ChartPrices = Record<string, ChartPrice>

export interface ChartPrice {
  number: number
  formatted: string
}

export interface ChartLayer {
  symbol: string
  active: boolean
}
