import { useEffect, useReducer } from "react"

import { UseTransactionReturn } from "../../network/transactions/common/transactionController"
import { FormResultProps } from "./types"
import { NetworkErrorKey } from "../../network/errors/networkError"
import { ResultType } from "../../network/types/reducer"
import { transactionResultReducer } from "../../network/transactions/common/transactionResultReducer"

export interface UseFormControllerProps {
  queryErrors?: (Error | undefined)[]
  transaction: UseTransactionReturn
  handleResponseDismissal?: () => void
}

export interface UseFormControllerReturn extends FormResultProps {
  onSubmit: (event: React.SyntheticEvent) => void
}

export function useFormController(
  props: UseFormControllerProps
): UseFormControllerReturn {
  const { transaction, queryErrors = [], handleResponseDismissal } = props
  const { action: transactionAction, result: transactionResult } = transaction
  const queryError = queryErrors.find((queryError) => queryError !== undefined)
  const [result, resultDispatch] = useReducer(transactionResultReducer, {})

  useEffect(() => {
    const { response, error } = transactionResult

    if (response) {
      resultDispatch({ type: ResultType.response, response })
    } else if (error) {
      switch (error.name) {
        case NetworkErrorKey.userDenied:
        case NetworkErrorKey.timeout:
          break
        default:
          resultDispatch({ type: ResultType.error, error })
      }
    }
  }, [transactionResult])

  useEffect(() => {
    if (queryError) {
      resultDispatch({ type: ResultType.error, error: queryError })
    }
  }, [queryError])

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    await transactionAction()
  }

  const onDismiss = () => {
    if (handleResponseDismissal) {
      handleResponseDismissal()
    }

    resultDispatch({ type: ResultType.pending })
  }

  return {
    result,
    onSubmit,
    onDismiss,
  }
}
