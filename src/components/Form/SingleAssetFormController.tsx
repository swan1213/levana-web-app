import { useMemo } from "react"

import { Amount } from "../../network"
import {
  TransactionRequirement,
  SingleAssetTransactionProps,
} from "../../network/transactions/common/types"
import { useFormController, UseFormControllerReturn } from "./useFormController"
import { useFormStats } from "./useFormStats"
import { FormStatsItem } from "./types"
import { UseFormAssetGroupReturn } from "../../network/common/assets/useFormAssetCollection"
import { UseFormValidateMaxAmount, useFormValidator } from "./useFormValidator"
import { UseSingleAssetFormQuery } from "../../network/queries/form/types"
import { TransactionControllerReturn } from "../../network/transactions/common/transactionController"

export interface SingleAssetFormControllerProps {
  requirement: TransactionRequirement.SingleAsset
  useFormAssetGroup: () => UseFormAssetGroupReturn
  useQuery: UseSingleAssetFormQuery
  transactionBuilder: TransactionControllerReturn<SingleAssetTransactionProps>
  validateMaxAsset?: boolean
  onResponseDismissal?: () => void
  children: (
    props: SingleAssetFormControllerReturn & UseFormControllerReturn
  ) => React.ReactNode
}

type UseFormSingleAssetGroupReturn = Pick<
  UseFormAssetGroupReturn,
  "assetIndex" | "setAssetIndex"
>

export interface SingleAssetFormControllerReturn
  extends UseFormSingleAssetGroupReturn {
  amount: UseFormAssetGroupReturn["firstAmount"]
  setAmount: UseFormAssetGroupReturn["setFirstAmount"]
  maxAmount?: Amount
  canSubmit: boolean
  stats: FormStatsItem[]
}

export default function SingleAssetFormController(
  props: SingleAssetFormControllerProps
) {
  const {
    useFormAssetGroup,
    useQuery,
    transactionBuilder,
    validateMaxAsset = false,
    onResponseDismissal,
    children,
  } = props

  // Assets

  const {
    assetIndex,
    setAssetIndex,
    firstAmount: amount,
    setFirstAmount: setAmount,
    assetGroup,
  } = useFormAssetGroup()

  // Query

  const { maxAmount, ...query } = useQuery({
    assetId: assetGroup.primaryAsset.id,
  })

  // Transaction

  const transactionProps = useMemo(() => {
    return { asset: assetGroup.primaryAsset }
  }, [assetGroup.primaryAsset])

  const transaction = transactionBuilder.useTransaction(transactionProps)

  const handleResponseDismissal = () => {
    setAmount(undefined)

    if (onResponseDismissal) {
      onResponseDismissal()
    }
  }

  const controller = useFormController({
    transaction,
    handleResponseDismissal,
  })

  // Stats

  const stats = useFormStats({ feeAsset: transaction.feeAsset })

  // Validation

  const validateMaxAmounts: UseFormValidateMaxAmount[] = [
    { amount: transaction.feeAsset.amount, maxAmount: query.maxFeeAmount },
  ]

  if (validateMaxAsset) {
    validateMaxAmounts.push({
      amount: assetGroup.primaryAsset.amount,
      maxAmount,
    })
  }

  const canSubmit = useFormValidator({
    validateMaxAmounts,
    validateAmounts: [amount],
  })

  return (
    <>
      {children({
        ...controller,
        assetIndex,
        setAssetIndex,
        amount,
        setAmount,
        maxAmount,
        canSubmit,
        stats,
      })}
    </>
  )
}
