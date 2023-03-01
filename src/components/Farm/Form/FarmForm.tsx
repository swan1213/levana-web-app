import Box from "@mui/material/Box"
import AddIcon from "@mui/icons-material/Add"

import { FarmRouteProps } from "../../../routes/farm"
import { useTranslations } from "../../../utils/useTranslations"
import AssetInput from "../../AssetInput"
import FormButton from "../../Form/FormButton"
import FormContainer from "../../Form/FormContainer"
import FormSlippage from "../../Form/FormSlippage"
import { useProportionalSimulation } from "../../../network/calculations/asset/useProportionalSimulation"
import FarmFormToggle from "./FarmFormToggle"
import { TransactionRequirement } from "../../../network/transactions/common/types"
import { SingleAssetFormControllerReturn } from "../../Form/SingleAssetFormController"
import { DoubleAssetFormControllerReturn } from "../../Form/DoubleAssetFormController"
import { AssetGroupProps } from "../../../types/assets"
import FormStats from "../../Form/FormStats"
import { AssetGroupType } from "../../../network/common/assets/assetGroup"
import { useFormAssetCollection } from "../../../network/common/assets/useFormAssetCollection"
import { useStakingAssetFormQuery } from "../../../network/queries/form/useStakingAssetFormQuery"
import { useDoubleAssetFormQuery } from "../../../network/queries/form/useDoubleAssetFormQuery"
import { useAutoStake } from "../../../network/transactions/staking/useAutoStake"
import { useUnbond } from "../../../network/transactions/staking/useUnbond"
import { defaultSlippageTolerance } from "../../../network/constants/config"
import { useState } from "react"

export type FarmFormProps = FarmRouteProps

export default function FarmForm(props: FarmFormProps) {
  const { route, assetGroup } = props

  return (
    <>
      <FarmFormToggle {...props} sx={{ mb: -2 }} />
      {route === "provide" ? (
        <FarmProvideForm assetGroup={assetGroup} />
      ) : (
        <FarmUnstakeForm assetGroup={assetGroup} />
      )}
    </>
  )
}

function FarmProvideForm(props: AssetGroupProps) {
  const { assetGroup } = props
  const t = useTranslations()
  const [slippage, setSlippage] = useState(defaultSlippageTolerance)

  const {
    useFormAssetGroup,
    setFirstAssetPrimary,
    setSecondAssetPrimary,
    firstAssets,
    secondAssets,
  } = useFormAssetCollection({ assetGroup })

  const transactionBuilder = useAutoStake(() => ({ slippage }))

  return (
    <FormContainer
      requirement={TransactionRequirement.DoubleAsset}
      useFormAssetGroup={useFormAssetGroup}
      useQuery={useDoubleAssetFormQuery}
      useSimulation={useProportionalSimulation}
      transactionBuilder={transactionBuilder}
      validateMaxPrimaryAsset
      validateMaxSecondaryAsset
    >
      {
        // TODO: get return type through container interface
        (formProps: DoubleAssetFormControllerReturn) => (
          <>
            <AssetInput
              onActive={setFirstAssetPrimary}
              assetIndex={formProps.assetIndex}
              setAssetIndex={formProps.setAssetIndex}
              amount={formProps.firstAmount}
              setAmount={formProps.setFirstAmount}
              assets={firstAssets}
              amountSubtitle={formProps.maxFirstAmount}
              sx={{ mb: 1 }}
            />
            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
              <AddIcon />
            </Box>
            <AssetInput
              onActive={setSecondAssetPrimary}
              assetIndex={formProps.assetIndex}
              setAssetIndex={formProps.setAssetIndex}
              amount={formProps.secondAmount}
              setAmount={formProps.setSecondAmount}
              assets={secondAssets}
              amountSubtitle={formProps.maxSecondAmount}
              sx={{ mb: 2 }}
            />
            <FormSlippage
              slippage={slippage}
              setSlippage={setSlippage}
              sx={{ mb: 2 }}
            />
            <FormStats items={formProps.stats} sx={{ mb: 2 }} />
            <FormButton type="submit" disabled={!formProps.canSubmit}>
              {t("farm.pool.form.provide.title")}
            </FormButton>
          </>
        )
      }
    </FormContainer>
  )
}

function FarmUnstakeForm(props: AssetGroupProps) {
  const { assetGroup } = props
  const t = useTranslations()

  const { useFormAssetGroup, setFirstAssetPrimary, firstAssets } =
    useFormAssetCollection({
      assetGroup,
      firstType: AssetGroupType.lp,
    })

  const transactionBuilder = useUnbond()

  return (
    <FormContainer
      requirement={TransactionRequirement.SingleAsset}
      useFormAssetGroup={useFormAssetGroup}
      useQuery={useStakingAssetFormQuery}
      transactionBuilder={transactionBuilder}
      validateMaxAsset
    >
      {
        // TODO: get return type through container interface
        (formProps: SingleAssetFormControllerReturn) => (
          <>
            <AssetInput
              onActive={setFirstAssetPrimary}
              assetIndex={formProps.assetIndex}
              setAssetIndex={formProps.setAssetIndex}
              amount={formProps.amount}
              setAmount={formProps.setAmount}
              assets={firstAssets}
              amountSubtitle={formProps.maxAmount}
              sx={{ mb: 2 }}
            />
            <FormStats items={formProps.stats} sx={{ mb: 2 }} />
            <FormButton type="submit" disabled={!formProps.canSubmit}>
              {t("farm.pool.form.unstake.title")}
            </FormButton>
          </>
        )
      }
    </FormContainer>
  )
}
