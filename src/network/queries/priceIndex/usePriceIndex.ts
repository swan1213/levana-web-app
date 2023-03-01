import { useQuery, gql } from "@apollo/client"

import { useNetworkError } from "../common/useNetworkError"

export interface PriceIndexQueries {
  assetId: string
  timeline: number
  frequency: number
}

export interface PriceIndexPrice {
  price: number
  timestamp: number
}

export interface PriceIndex {
  assetId: string
  prices: PriceIndexPrice[]
  queried: number
}

export interface PriceIndexData {
  result: PriceIndex
}

export const priceIndexQuery = gql`
  query PriceIndex($assetId: String!, $timeline: Int!, $frequency: Int!)
  @api(name: "levana") {
    result: priceIndex(
      assetId: $assetId
      timeline: $timeline
      frequency: $frequency
    ) {
      assetId
      prices {
        price
        timestamp
      }
      queried
    }
  }
`

export function usePriceIndex(query: PriceIndexQueries) {
  const { error, ...results } = useQuery<PriceIndexData>(priceIndexQuery, {
    variables: query,
  })

  return {
    error: useNetworkError(error),
    ...results,
  }
}
