import { Asset } from "../../network"
import { FormStatsItem } from "./types"
import { useTranslations } from "../../utils/useTranslations"

export interface UseFormStatsProps {
  baseAsset?: Asset
  swapAsset?: Asset
  feeAsset?: Asset
}

export function useFormStats(props: UseFormStatsProps) {
  const { baseAsset, swapAsset, feeAsset } = props
  const t = useTranslations("form.stats")
  const items: FormStatsItem[] = []

  if (baseAsset) {
    items.push({
      title: t("base.title"),
      value: baseAsset.toFormattedAmount(),
    })
  }

  if (swapAsset) {
    items.push({
      title: t("swap.title"),
      value: swapAsset.toFormattedAmount(),
    })
  }

  if (feeAsset) {
    items.push({
      title: t("fee.title"),
      value: feeAsset.toFormattedAmount(2),
    })
  }

  return items
}
