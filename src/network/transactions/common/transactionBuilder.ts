import { transactionController } from "./transactionController"
import {
  TransactionRequirement,
  TransactionRequiredProps,
} from "../common/types"
import Transaction from "../common/transaction"

/* eslint-disable indent */

export const transactionBuilder = <
  InternalProps extends TransactionRequiredProps,
  ExternalProps extends Record<string, unknown> | void = void,
  InheritlessInternalProps extends Record<string, unknown> = Omit<
    InternalProps,
    keyof TransactionRequiredProps
  >,
  TransactionProps extends Record<string, unknown> | void = {
    [Key in keyof InheritlessInternalProps]: Key extends string ? Key : never
  }[keyof InheritlessInternalProps] extends never
    ? void
    : InheritlessInternalProps,
  PrepareValue = ExternalProps extends void ? void : () => ExternalProps
>(
  TransactionClass: new (
    props: ExternalProps & TransactionProps & TransactionRequiredProps
  ) => Transaction,
  requirement: TransactionRequirement = TransactionRequirement.NoAsset
) => {
  return (prepare: PrepareValue) => {
    const externalProps: ExternalProps =
      typeof prepare === "function" ? prepare() : {}

    const { useTransaction } = transactionController<TransactionProps>({
      create: (props) =>
        new TransactionClass(Object.assign({}, props, externalProps)),
    })

    return { requirement, useTransaction }
  }
}
