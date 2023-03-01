import { useContext, useMemo, createContext, PropsWithChildren } from "react"
import { useRecoilValue } from "recoil"
import currency from "currency.js"
import { NetworkStatus } from "@apollo/client"

import { languageState } from "../../locales"
import { timelineState } from "../../tools/timeline/state"
import { timelineMap } from "../../tools/timeline/map"
import { usePriceIndex } from "../../network/queries/priceIndex/usePriceIndex"
import { ChartData, ChartItem, ChartPrice } from "../../types/chart"
import { PriceIndexData } from "../../network/queries/priceIndex/usePriceIndex"
import { assetGroupState } from "../../data/assetGroupState"

type PriceIndexReturn = ReturnType<typeof usePriceIndex>

type PriceIndexQuery = Pick<PriceIndexReturn, "loading" | "error"> & {
  assetId: string
  initializing: boolean
  chartData?: ChartData
}

interface ExchangeContextProps {
  priceIndex: PriceIndexQuery
}

const ExchangeContext = createContext<ExchangeContextProps>({
  priceIndex: {
    assetId: "",
    initializing: false,
    loading: false,
    error: undefined,
  },
})

export const useExchangeContext = () => useContext(ExchangeContext)

export function ExchangeProvider(props: PropsWithChildren<unknown>) {
  const { children } = props
  const language = useRecoilValue(languageState)
  const timeline = useRecoilValue(timelineState)
  const assetGroup = useRecoilValue(assetGroupState)
  const assetId = assetGroup.primaryAsset.id

  const priceIndex = usePriceIndex({ assetId, ...timelineMap(timeline) })
  const {
    data: priceIndexData,
    previousData: priceIndexPreviousData,
    networkStatus: priceIndexNetworkStatus,
    ...priceIndexProps
  } = priceIndex

  const initializing = useMemo(
    () => priceIndexNetworkStatus === NetworkStatus.loading,
    [priceIndexNetworkStatus]
  )

  const loading = useMemo(
    () => priceIndexNetworkStatus === NetworkStatus.setVariables,
    [priceIndexNetworkStatus]
  )

  const chartData = useMemo(() => {
    const data = priceIndexData ?? priceIndexPreviousData

    if (data) {
      return formatPriceIndex(data, language)
    }
  }, [priceIndexData, priceIndexPreviousData, language])

  return (
    <ExchangeContext.Provider
      value={{
        priceIndex: {
          ...priceIndexProps,
          assetId,
          initializing,
          loading,
          chartData,
        },
      }}
    >
      {children}
    </ExchangeContext.Provider>
  )
}

const formatPriceIndex = (
  data: PriceIndexData,
  language: string
): ChartData | undefined => {
  const { prices } = data.result

  const createChartPrice = (price: number): ChartPrice => ({
    number: price,
    formatted: currency(price, { precision: 2 }).format(),
  })

  const items: ChartItem[] = []
  let min: ChartPrice | undefined
  let max: ChartPrice | undefined

  for (let index = 0; index < prices.length; index++) {
    const { price, timestamp } = prices[index]
    const chartPrice = createChartPrice(price)

    if (!min || min.number > chartPrice.number) {
      min = chartPrice
    }

    if (!max || max.number < chartPrice.number) {
      max = chartPrice
    }

    items.push({
      prices: chartPrice,
      date: new Date(timestamp).toLocaleDateString(language, {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      }),
    })
  }

  return min && max ? { items, min, max } : undefined
}
