import Amount from "../../network/common/amount"

export interface UseFormValidateMaxAmount {
  amount: Amount | undefined
  maxAmount: Amount | undefined
}

export interface UseFormValidatorProps {
  validateMaxAmounts: UseFormValidateMaxAmount[]
  validateAmounts: (Amount | undefined)[]
}

export function useFormValidator(props: UseFormValidatorProps) {
  const { validateMaxAmounts, validateAmounts } = props

  for (const { amount, maxAmount } of validateMaxAmounts) {
    if (
      !maxAmount ||
      (amount && maxAmount && amount.toInt() > maxAmount.toInt())
    ) {
      return false
    }
  }

  for (const amount of validateAmounts) {
    if (!amount || (amount && 0 >= amount.toInt())) {
      return false
    }
  }

  return true
}
