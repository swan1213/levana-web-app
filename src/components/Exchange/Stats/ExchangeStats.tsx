import Box, { BoxProps } from "@mui/material/Box"
import { useMemo } from "react"
import { useRecoilValue } from "recoil"

import ExchangeStatLabel from "./ExchangeStatLabel"
import { useExchangeContext } from "../ExchangeContext"
import { useIndexTokenInfo } from "../../../network/queries/asset/useIndexTokenInfo"
import { useUnderlying } from "../../../network/queries/asset/useUnderlying"
import { assetGroupState } from "../../../data/assetGroupState"
import { useTranslations } from "../../../utils/useTranslations"
import BackgroundSkeleton from "../../common/BackgroundSkeleton"

export default function ExchangeStats(props: BoxProps) {
  const { priceIndex } = useExchangeContext()
  const { chartData } = priceIndex
  const assetGroup = useRecoilValue(assetGroupState)
  const { rebalanceInfo } = useIndexTokenInfo(assetGroup)
  const { ratio } = useUnderlying(assetGroup)
  const t = useTranslations("exchange.stats")

  const toFixed = (number: string) => parseFloat(number).toFixed(2)

  const ratioValue = useMemo(() => {
    if (ratio) {
      return `x${toFixed(ratio)}`
    }
  }, [ratio])

  const targetRatioValue = useMemo(() => {
    if (rebalanceInfo?.targetRatio) {
      return `x${toFixed(rebalanceInfo.targetRatio)}`
    }
  }, [rebalanceInfo?.targetRatio])

  const [minValue, maxValue] = useMemo(() => {
    if (chartData) {
      return [chartData.min.formatted, chartData.max.formatted]
    } else {
      return []
    }
  }, [chartData])

  const hasValue = ratioValue || targetRatioValue || minValue

  return (
    <Box
      {...props}
      display="flex"
      flexWrap="wrap"
      flexDirection={{ xs: "column", sm: "row" }}
      rowGap={1}
      columnGap={3}
    >
      {hasValue ? (
        <>
          {ratioValue && (
            <ExchangeStatLabel
              title={t("realLeverage.title")}
              value={ratioValue}
            />
          )}
          {targetRatioValue && (
            <ExchangeStatLabel
              title={t("targetLeverage.title")}
              value={targetRatioValue}
            />
          )}
          {minValue && (
            <ExchangeStatLabel title={t("min.title")} value={minValue} />
          )}
          {maxValue && (
            <ExchangeStatLabel title={t("max.title")} value={maxValue} />
          )}
        </>
      ) : (
        <BackgroundSkeleton variant="text" width="100%" height="20px" />
      )}
    </Box>
  )
}
