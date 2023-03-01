import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

import FormContainer from "../../Form/FormContainer"
import FormButton from "../../Form/FormButton"
import { SingleAssetFormControllerReturn } from "../../Form/SingleAssetFormController"
import {
  SingleAssetTransactionProps,
  TransactionRequirement,
} from "../../../network/transactions/common/types"
import { useFormAssetCollection } from "../../../network/common/assets/useFormAssetCollection"
import { AssetGroupType } from "../../../network/common/assets/assetGroup"
import AssetInput from "../../AssetInput"
import { useSingleAssetFormQuery } from "../../../network/queries/form/useSingleAssetFormQuery"
import { useTranslations } from "../../../utils/useTranslations"
import { assetCollection } from "../../../network/constants/assetCollection"
import { Denom, LLISymbol } from "../../../network/constants/foundation"
import { TransactionControllerReturn } from "../../../network/transactions/common/transactionController"
import { useVaultDeposit } from "../../../network/transactions/perps/vault/useVaultDeposit"
import { useVaultWithdraw } from "../../../network/transactions/perps/vault/useVaultWithdraw"
import { UseSingleAssetFormQuery } from "../../../network/queries/form/types"
import { useVaultWithdrawAssetFormQuery } from "../../../network/queries/form/useVaultWithdrawAssetFormQuery"

export interface PerpsVaultFormProps {
  onCancel: () => void
}

interface PerpsVaultBaseFormProps extends PerpsVaultFormProps {
  useQuery: UseSingleAssetFormQuery
  transactionBuilder: TransactionControllerReturn<SingleAssetTransactionProps>
  submitTitle: string
}

function PerpsVaultForm(props: PerpsVaultBaseFormProps) {
  const { useQuery, transactionBuilder, submitTitle, onCancel } = props
  const t = useTranslations("perps.menu.vault")

  const assetGroup = assetCollection.getGroup(LLISymbol.lvn)

  const { useFormAssetGroup, setFirstAssetPrimary, firstAssets } =
    useFormAssetCollection({
      assetGroup,
      firstType: AssetGroupType.secondary,
    })

  return (
    <Box sx={{ m: -2 }}>
      <FormContainer
        requirement={TransactionRequirement.SingleAsset}
        useFormAssetGroup={useFormAssetGroup}
        useQuery={useQuery}
        transactionBuilder={transactionBuilder}
        validateMaxAsset
        onResponseDismissal={onCancel}
      >
        {(formProps: SingleAssetFormControllerReturn) => (
          <>
            <AssetInput
              onActive={setFirstAssetPrimary}
              assetIndex={0}
              setAssetIndex={formProps.setAssetIndex}
              amount={formProps.amount}
              setAmount={formProps.setAmount}
              assets={firstAssets.filter((asset) => asset.symbol === Denom.usd)}
              amountSubtitle={formProps.maxAmount}
            />

            <FormButton
              type="submit"
              disabled={!formProps.canSubmit}
              sx={{ mt: 2 }}
            >
              {submitTitle}
            </FormButton>

            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              onClick={onCancel}
            >
              {t("cancel")}
            </Button>
          </>
        )}
      </FormContainer>
    </Box>
  )
}

export function PerpsVaultDepositForm(props: PerpsVaultFormProps) {
  const { onCancel } = props
  const transactionBuilder = useVaultDeposit()
  const t = useTranslations("perps.menu.vault")

  return (
    <PerpsVaultForm
      useQuery={useSingleAssetFormQuery}
      transactionBuilder={transactionBuilder}
      submitTitle={t("deposit")}
      onCancel={onCancel}
    />
  )
}

export function PerpsVaultWithdrawForm(props: PerpsVaultFormProps) {
  const { onCancel } = props
  const transactionBuilder = useVaultWithdraw()
  const t = useTranslations("perps.menu.vault")

  return (
    <PerpsVaultForm
      useQuery={useVaultWithdrawAssetFormQuery}
      transactionBuilder={transactionBuilder}
      submitTitle={t("withdraw")}
      onCancel={onCancel}
    />
  )
}
