import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import Typography from "@mui/material/Typography"
import Slider from "@mui/material/Slider"
import { useState } from "react"
import { useRecoilState } from "recoil"

import FormContainer from "../Form/FormContainer"
import FormButton from "../Form/FormButton"
import { SingleAssetFormControllerReturn } from "../Form/SingleAssetFormController"
import { TransactionRequirement } from "../../network/transactions/common/types"
import { assetGroupState } from "../../data/assetGroupState"
import { useFormAssetCollection } from "../../network/common/assets/useFormAssetCollection"
import { AssetGroupType } from "../../network/common/assets/assetGroup"
import { useUnbond } from "../../network/transactions/staking/useUnbond"
import AssetInput from "../AssetInput"
import { useStakingAssetFormQuery } from "../../network/queries/form/useStakingAssetFormQuery"
import { defaultSlippageTolerance } from "../../network/constants/config"
import FormStats from "../Form/FormStats"
import { useTranslations } from "../../utils/useTranslations"
import { PositionType } from "./tradeTypes"

const formatOption = (option: number) => `${option * 100}%`

const leverageMarks = [
  { value: 0, label: "1X" },
  { value: 33, label: "2X" },
  { value: 66, label: "5X" },
  { value: 100, label: "10X" },
]

const slippageOptions = [0.001, 0.005, defaultSlippageTolerance]

export default function TradePositionForm() {
  const [assetGroup] = useRecoilState(assetGroupState)
  const [type, setType] = useState<PositionType>("short")
  const [leverage, setLeverage] = useState(leverageMarks[0].value)
  const [slippage, setSlippage] = useState(defaultSlippageTolerance)
  const t = useTranslations("perps.trade.form")

  // TODO: use correct asset and transaction types

  const { useFormAssetGroup, setFirstAssetPrimary, firstAssets } =
    useFormAssetCollection({
      assetGroup,
      firstType: AssetGroupType.primary,
    })

  const transactionBuilder = useUnbond()

  const handleType = (
    event: React.MouseEvent<HTMLElement>,
    type: PositionType | null
  ) => {
    if (type) {
      setType(type)
    }
  }

  const handleLeverage = (event: Event, value: number | number[]) => {
    if (typeof value === "number") {
      setLeverage(value)
    }
  }

  const handleSlippage = (
    event: React.MouseEvent<HTMLElement>,
    option: number | null
  ) => {
    if (option) {
      setSlippage(option)
    }
  }

  return (
    <FormContainer
      requirement={TransactionRequirement.SingleAsset}
      useFormAssetGroup={useFormAssetGroup}
      useQuery={useStakingAssetFormQuery}
      transactionBuilder={transactionBuilder}
    >
      {(formProps: SingleAssetFormControllerReturn) => (
        <>
          <ToggleButtonGroup
            size="small"
            value={type}
            exclusive
            onChange={handleType}
            fullWidth
          >
            <ToggleButton value="short">{t("short")}</ToggleButton>
            <ToggleButton value="long">{t("long")}</ToggleButton>
          </ToggleButtonGroup>

          <Typography variant="body1" sx={{ mt: 3 }}>
            {t("amount")}
          </Typography>

          <AssetInput
            onActive={setFirstAssetPrimary}
            assetIndex={formProps.assetIndex}
            setAssetIndex={formProps.setAssetIndex}
            amount={formProps.amount}
            setAmount={formProps.setAmount}
            assets={firstAssets}
            amountSubtitle={formProps.maxAmount}
            sx={{ mt: 1 }}
          />

          <Typography variant="body1" sx={{ mt: 3 }}>
            {t("leverage")}
          </Typography>

          <Box sx={{ px: 1.5 }}>
            <Slider
              value={leverage}
              onChange={handleLeverage}
              step={null}
              marks={leverageMarks}
            />
          </Box>

          <Typography variant="body1" sx={{ mt: 3 }}>
            {t("size")}
          </Typography>

          <AssetInput
            onActive={setFirstAssetPrimary}
            assetIndex={formProps.assetIndex}
            setAssetIndex={formProps.setAssetIndex}
            amount={formProps.amount}
            setAmount={formProps.setAmount}
            assets={firstAssets}
            amountSubtitle={formProps.maxAmount}
            sx={{ mt: 1 }}
          />

          <Typography variant="body1" sx={{ mt: 3 }}>
            {t("slippage")}
          </Typography>

          <ToggleButtonGroup
            size="small"
            value={slippage}
            exclusive
            onChange={handleSlippage}
            fullWidth
            sx={{ mt: 1 }}
          >
            {slippageOptions.map((option, index) => (
              <ToggleButton key={index} value={option}>
                {formatOption(option)}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <FormButton
            type="submit"
            disabled={!formProps.canSubmit}
            sx={{ mt: 3 }}
          >
            {t("submitButton.title", { type })}
          </FormButton>

          <Typography variant="body2" sx={{ mt: 1 }}>
            {t("submitDescription")}
          </Typography>

          <Divider sx={{ mt: 3 }} />

          <Typography variant="body1" sx={{ mt: 3 }}>
            {t("stats")}
          </Typography>

          <FormStats items={formProps.stats} sx={{ mt: 1 }} />
        </>
      )}
    </FormContainer>
  )
}
