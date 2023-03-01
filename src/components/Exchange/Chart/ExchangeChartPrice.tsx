import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useMemo } from "react"
import currency from "currency.js"

import { useExchangeContext } from "../ExchangeContext"
import { ChartData } from "../../../types/chart"

export default function ExchangeChartPrice() {
  const { priceIndex } = useExchangeContext()
  const { chartData } = priceIndex
  const controller = useExchangeChartPriceController(chartData)

  if (controller === undefined) {
    return null
  }

  const { priceFormatted, percentFormatted, isPercentPositive } = controller

  return (
    <Stack direction="row" spacing={1} alignItems="start">
      <Typography sx={{ fontSize: "2.5rem" }}>{priceFormatted}</Typography>
      <Typography
        sx={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: isPercentPositive ? "success.light" : "error.main",
          paddingTop: "0.4rem",
        }}
      >
        {percentFormatted}
      </Typography>
    </Stack>
  )
}

// TODO: move func location
const useExchangeChartPriceController = (chartData?: ChartData) => {
  let priceFormatted: string | undefined
  let percent: number | undefined
  let isPercentPositive: boolean | undefined

  if (chartData && chartData.items.length > 0) {
    const { items } = chartData
    const firstPrice = items[0].prices
    const lastPrice = items[items.length - 1].prices

    priceFormatted = lastPrice.formatted
    percent = ((lastPrice.number - firstPrice.number) / firstPrice.number) * 100
    isPercentPositive = Math.sign(percent) >= 0
  }

  const percentFormatted = useMemo(() => {
    if (!percent || isPercentPositive === undefined) {
      return
    }

    const value = currency(percent, {
      precision: 2,
      symbol: isPercentPositive ? "+" : "",
    }).format()

    return `${value}%`
  }, [percent, isPercentPositive])

  if (
    priceFormatted !== undefined &&
    percentFormatted !== undefined &&
    isPercentPositive !== undefined
  ) {
    return { priceFormatted, percentFormatted, isPercentPositive }
  } else {
    return undefined
  }
}
