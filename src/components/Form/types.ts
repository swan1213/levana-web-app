import {
  SingleAssetFormControllerProps,
  SingleAssetFormControllerReturn,
} from "./SingleAssetFormController"
import {
  DoubleAssetFormControllerProps,
  DoubleAssetFormControllerReturn,
} from "./DoubleAssetFormController"
import { TransactionResultState } from "../../network/transactions/common/transactionResultReducer"

export type FormControllerProps =
  | SingleAssetFormControllerProps
  | DoubleAssetFormControllerProps

export type FormControllerReturn =
  | SingleAssetFormControllerReturn
  | DoubleAssetFormControllerReturn

export interface FormStatsItem {
  title: string
  value: string
}

export interface FormResultProps {
  result: TransactionResultState
  onDismiss: () => void
}
