import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
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
import { useTranslations } from "../../utils/useTranslations"

type StakeType = "stake" | "unstake"

export default function RiskFundForm() {
  const [assetGroup] = useRecoilState(assetGroupState)
  const [type, setType] = useState<StakeType>("stake")
  const t = useTranslations("perps.riskFund.form")

  // TODO: use correct asset and transaction types

  const { useFormAssetGroup, setFirstAssetPrimary, firstAssets } =
    useFormAssetCollection({
      assetGroup,
      firstType: AssetGroupType.primary,
    })

  const transactionBuilder = useUnbond()

  const handleType = (
    event: React.MouseEvent<HTMLElement>,
    type: StakeType | null
  ) => {
    if (type) {
      setType(type)
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
            <ToggleButton value="stake">{t("stake")}</ToggleButton>
            <ToggleButton value="unstake">{t("unstake")}</ToggleButton>
          </ToggleButtonGroup>

          <AssetInput
            onActive={setFirstAssetPrimary}
            assetIndex={formProps.assetIndex}
            setAssetIndex={formProps.setAssetIndex}
            amount={formProps.amount}
            setAmount={formProps.setAmount}
            assets={firstAssets}
            amountSubtitle={formProps.maxAmount}
            sx={{ mt: 2 }}
          />

          <FormButton
            type="submit"
            disabled={!formProps.canSubmit}
            sx={{ mt: 2 }}
          >
            {t("button.title")}
          </FormButton>
        </>
      )}
    </FormContainer>
  )
}
