import { useEffect, useMemo } from "react"

import Amount from "../../network/common/amount"
import {
  TransactionRequirement,
  DoubleAssetTransactionProps,
} from "../../network/transactions/common/types"
import { useFormController, UseFormControllerReturn } from "./useFormController"
import { FormStatsItem } from "./types"
import { useFormStats } from "./useFormStats"
import { UseSimulation } from "../../network/calculations/asset/types"
import { UseFormAssetGroupReturn } from "../../network/common/assets/useFormAssetCollection"
import { UseFormValidateMaxAmount, useFormValidator } from "./useFormValidator"
import { UseDoubleAssetFormQuery } from "../../network/queries/form/types"
import { TransactionControllerReturn } from "../../network/transactions/common/transactionController"

export interface DoubleAssetFormControllerProps {
  requirement: TransactionRequirement.DoubleAsset
  useFormAssetGroup: () => UseFormAssetGroupReturn
  useQuery: UseDoubleAssetFormQuery
  useSimulation: UseSimulation
  transactionBuilder: TransactionControllerReturn<DoubleAssetTransactionProps>
  validateMaxPrimaryAsset?: boolean
  validateMaxSecondaryAsset?: boolean
  onResponseDismissal?: () => void
  children: (
    props: DoubleAssetFormControllerReturn & UseFormControllerReturn
  ) => React.ReactNode
}

type UseFormDoubleAssetGroupReturn = Pick<
  UseFormAssetGroupReturn,
  | "assetIndex"
  | "setAssetIndex"
  | "firstAmount"
  | "setFirstAmount"
  | "secondAmount"
  | "setSecondAmount"
>

export interface DoubleAssetFormControllerReturn
  extends UseFormDoubleAssetGroupReturn {
  maxFirstAmount?: Amount
  maxSecondAmount?: Amount
  canSubmit: boolean
  stats: FormStatsItem[]
}

export default function DoubleAssetFormController(
  props: DoubleAssetFormControllerProps
) {
  const {
    useFormAssetGroup,
    useQuery,
    useSimulation,
    transactionBuilder,
    validateMaxPrimaryAsset = false,
    validateMaxSecondaryAsset = false,
    onResponseDismissal,
    children,
  } = props

  // Assets

  const {
    assetIndex,
    setAssetIndex,
    firstAssetId,
    firstAmount,
    setFirstAmount,
    secondAssetId,
    secondAmount,
    setSecondAmount,
    setSecondaryAmount,
    assetGroup,
  } = useFormAssetGroup()

  // Query

  const {
    maxFirstAmount,
    maxSecondAmount,
    offerPoolAsset,
    askPoolAsset,
    ...query
  } = useQuery({
    firstAssetId,
    secondAssetId,
    primaryAssetId: assetGroup.primaryAsset.id,
    pairAddress: assetGroup.pairAddress,
  })

  // Simulation

  const simulation = useSimulation({
    offerPoolAsset,
    askPoolAsset,
    offerAmount: assetGroup.primaryAsset.amount.toString(),
  })

  const simulationAskAmount = {
    int: simulation?.askAsset.amount.toInt() ?? 0,
    decimal: simulation?.askAsset.amount.toDecimal(),
  }

  useEffect(() => {
    if (simulationAskAmount.decimal && simulationAskAmount.int > 0) {
      setSecondaryAmount(new Amount(simulationAskAmount.decimal, true))
    } else {
      setSecondaryAmount(undefined)
    }
  }, [simulationAskAmount.int, simulationAskAmount.decimal, setSecondaryAmount])

  // Transaction

  const transactionProps = useMemo(() => ({ assetGroup }), [assetGroup])

  const transaction = transactionBuilder.useTransaction(transactionProps)

  const handleResponseDismissal = () => {
    setFirstAmount(undefined)
    setSecondAmount(undefined)

    if (onResponseDismissal) {
      onResponseDismissal()
    }
  }

  const controller = useFormController({
    queryErrors: [query.error],
    transaction,
    handleResponseDismissal,
  })

  // Stats

  const stats = useFormStats({
    baseAsset: simulation?.baseAsset,
    swapAsset: simulation?.feeAsset,
    feeAsset: transaction.feeAsset,
  })

  // Validation

  const validateMaxAmounts: UseFormValidateMaxAmount[] = [
    { amount: transaction.feeAsset.amount, maxAmount: query.maxFeeAmount },
  ]

  if (validateMaxPrimaryAsset) {
    validateMaxAmounts.push({
      amount: assetGroup.primaryAsset.amount,
      maxAmount: query.maxPrimaryAmount,
    })
  }

  if (validateMaxSecondaryAsset) {
    validateMaxAmounts.push({
      amount: assetGroup.secondaryAsset.amount,
      maxAmount: query.maxSecondaryAmount,
    })
  }

  const canSubmit = useFormValidator({
    validateMaxAmounts,
    validateAmounts: [firstAmount, secondAmount],
  })

  return (
    <>
      {children({
        ...controller,
        assetIndex,
        setAssetIndex,
        firstAmount,
        setFirstAmount,
        secondAmount,
        setSecondAmount,
        maxFirstAmount,
        maxSecondAmount,
        canSubmit,
        stats,
      })}
    </>
  )
}
