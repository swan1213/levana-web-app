import { BoxProps } from "@mui/material/Box"
import ButtonBase from "@mui/material/ButtonBase"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useConnectedWallet } from "@terra-money/use-wallet"
import { useState } from "react"

import AssetInputBorder from "./AssetInputBorder"
import AssetInputVStack from "./AssetInputVStack"
import AssetInputField from "./AssetInputField"
import AssetInputSelect from "./AssetInputSelect"
import AssetInputConnect from "./AssetInputConnect"
import {
  AssetInputActiveProps,
  AssetInputAssets,
  AssetInputAmountState,
  AssetInputIndexState,
} from "./types"
import Amount from "../../network/common/amount"
import { useTranslations } from "../../utils/useTranslations"

export interface AssetInputProps
  extends AssetInputActiveProps,
    AssetInputAmountState,
    AssetInputIndexState,
    AssetInputAssets {
  assetSubtitle?: string
  assetSubtitleColor?: "text.primary" | "text.secondary" | "text.disabled"
  amountColor?: "text.primary" | "text.disabled"
  amountSubtitle?: string | Amount
  readOnly?: boolean
}

const padding = 2

export default function AssetInput(props: AssetInputProps & BoxProps) {
  const {
    assetIndex,
    setAssetIndex,
    amount,
    setAmount,
    assets,
    assetSubtitle,
    assetSubtitleColor,
    amountColor,
    amountSubtitle,
    readOnly,
    onActive,
    sx,
    ...muiProps
  } = props

  const [assetsOpen, setAssetsOpen] = useState(false)
  const openAssets = () => setAssetsOpen(true)

  const t = useTranslations()

  const getAmountSubtitle = (amountSubtitle: string | Amount) => {
    if (typeof amountSubtitle === "string") {
      return amountSubtitle
    } else {
      return t("form.balance.title", { balance: amountSubtitle.toDecimal() })
    }
  }

  const setMaxAmount = () => {
    if (setAmount && amountSubtitle instanceof Amount) {
      if (onActive) {
        onActive()
      }

      setAmount(new Amount(amountSubtitle.toDecimal(), true))
    }
  }

  const wallet = useConnectedWallet()

  return (
    <AssetInputBorder {...muiProps} sx={{ ...sx, position: "relative" }}>
      <Stack
        direction="row"
        sx={{ minHeight: "4em", justifyContent: "space-between" }}
      >
        <AssetInputVStack
          Primary={
            <AssetInputSelect
              assetIndex={assetIndex}
              setAssetIndex={setAssetIndex}
              assets={assets}
              open={assetsOpen}
              setOpen={setAssetsOpen}
              padding={padding}
              readOnly={readOnly}
            />
          }
          Secondary={
            assetSubtitle ? (
              <Typography
                variant="body2"
                sx={{
                  color: assetSubtitleColor ?? "text.secondary",
                  pt: padding,
                  pl: padding,
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                }}
              >
                {assetSubtitle}
              </Typography>
            ) : undefined
          }
          onClick={assets.length > 1 ? openAssets : undefined}
        />
        <AssetInputVStack
          Primary={
            <AssetInputField
              amount={amount}
              setAmount={setAmount}
              color={amountColor}
              padding={padding}
              readOnly={readOnly}
              onActive={onActive}
            />
          }
          Secondary={
            amountSubtitle ? (
              <ButtonBase
                disableRipple
                disableTouchRipple
                onClick={setMaxAmount}
                disabled={typeof amountSubtitle === "string"}
                sx={{ justifyContent: "flex-end" }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.disabled",
                    textAlign: "right",
                    pt: padding,
                    pr: padding,
                    pointerEvents: "none",
                  }}
                >
                  {getAmountSubtitle(amountSubtitle)}
                </Typography>
              </ButtonBase>
            ) : undefined
          }
        />
      </Stack>
      {!wallet && <AssetInputConnect />}
    </AssetInputBorder>
  )
}
