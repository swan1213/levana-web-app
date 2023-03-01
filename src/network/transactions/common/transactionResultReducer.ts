import { TransactionResponse } from "./types"
import { ResultType, ResultAction, ResultState } from "../../types/reducer"

export type TransactionResultAction = ResultAction<TransactionResponse>

export type TransactionResultState = ResultState<TransactionResponse>

export const transactionResultReducer = (
  prevState: TransactionResultState,
  action: TransactionResultAction
): TransactionResultState => {
  switch (action.type) {
    case ResultType.pending:
      return {}
    case ResultType.response:
      return { response: action.response }
    case ResultType.error:
      return { error: action.error }
  }
}
