import Box from "@mui/material/Box"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import { useRecoilState } from "recoil"

import { useTranslations } from "../../../utils/useTranslations"
import SectionHeader from "../../common/Section/SectionHeader"
import AssetInput from "../../AssetInput"
import FormButton from "../../Form/FormButton"
import FormContainer from "../../Form/FormContainer"
import { useTerraSwapSimulation } from "../../../network/calculations/asset/useTerraSwapSimulation"
import { TransactionRequirement } from "../../../network/transactions/common/types"
import FormStats from "../../Form/FormStats"
import { AssetGroupType } from "../../../network/common/assets/assetGroup"
import { DoubleAssetFormControllerReturn } from "../../Form/DoubleAssetFormController"
import { assetGroupState } from "../../../data/assetGroupState"
import { useFormAssetCollection } from "../../../network/common/assets/useFormAssetCollection"
import { useDoubleAssetFormQuery } from "../../../network/queries/form/useDoubleAssetFormQuery"
import { useSwap } from "../../../network/transactions/terraSwap/useSwap"

export default function ExchangeForm() {
  const [assetGroup] = useRecoilState(assetGroupState)
  const t = useTranslations()
  // const assetGroup = assetGroupCollection.getGroup(AssetIdentifier.luna2x)

  const {
    useFormAssetGroup,
    isFirstAssetPrimary,
    setFirstAssetPrimary,
    setSecondAssetPrimary,
    firstAssets,
    secondAssets,
  } = useFormAssetCollection({
    assetGroup,
    firstType: AssetGroupType.secondary,
    secondType: AssetGroupType.primary,
  })

  const transactionBuilder = useSwap()

  const primaryAssetSubtitle = t("exchange.form.primaryAsset.title")
  const secondaryAssetSubtitle = t("exchange.form.secondaryAsset.title")
  const firstAssetSubtitle = isFirstAssetPrimary
    ? primaryAssetSubtitle
    : secondaryAssetSubtitle
  const secondAssetSubtitle = isFirstAssetPrimary
    ? secondaryAssetSubtitle
    : primaryAssetSubtitle

  return (
    <FormContainer
      requirement={TransactionRequirement.DoubleAsset}
      useFormAssetGroup={useFormAssetGroup}
      useQuery={useDoubleAssetFormQuery}
      useSimulation={useTerraSwapSimulation}
      transactionBuilder={transactionBuilder}
      validateMaxPrimaryAsset
    >
      {
        // TODO: use proper type return type
        (formProps: DoubleAssetFormControllerReturn) => (
          <>
            <SectionHeader title={t("exchange.title")} />
            <AssetInput
              onActive={setFirstAssetPrimary}
              assetIndex={formProps.assetIndex}
              setAssetIndex={formProps.setAssetIndex}
              amount={formProps.firstAmount}
              setAmount={formProps.setFirstAmount}
              assets={firstAssets}
              assetSubtitle={firstAssetSubtitle}
              amountSubtitle={formProps.maxFirstAmount}
              sx={{ mb: 1 }}
            />
            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
              {isFirstAssetPrimary ? (
                <ArrowDownwardIcon />
              ) : (
                <ArrowUpwardIcon />
              )}
            </Box>
            <AssetInput
              onActive={setSecondAssetPrimary}
              assetIndex={formProps.assetIndex}
              setAssetIndex={formProps.setAssetIndex}
              amount={formProps.secondAmount}
              setAmount={formProps.setSecondAmount}
              assets={secondAssets}
              assetSubtitle={secondAssetSubtitle}
              amountSubtitle={formProps.maxSecondAmount}
              sx={{ mb: 1 }}
            />
            <FormStats items={formProps.stats} sx={{ mb: 2 }} />
            <FormButton type="submit" disabled={!formProps.canSubmit}>
              {t("exchange.form.submit.title")}
            </FormButton>
          </>
        )
      }
    </FormContainer>
  )
}
