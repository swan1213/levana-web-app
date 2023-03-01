import { MsgExecuteContract } from "@terra-money/terra.js/dist/core/wasm/msgs"

import { contracts } from "../../../constants/foundation"
import {
  TransactionRequirement,
  SingleAssetTransactionProps,
  TransactionRequiredProps,
} from "../../common/types"
import Transaction from "../../common/transaction"
import { transactionBuilder } from "../../common/transactionBuilder"

type InternalProps = TransactionRequiredProps & SingleAssetTransactionProps

type ExternalProps = void

class VaultWithdrawTransaction extends Transaction {
  constructor(props: InternalProps & ExternalProps) {
    const { walletAddress, asset } = props

    const execute = new MsgExecuteContract(walletAddress, contracts.vault, {
      withdraw: {
        partial: asset.amount.toDecimal(),
      },
    })

    super([execute])
  }
}

export const useVaultWithdraw = transactionBuilder<
  InternalProps,
  ExternalProps
>(VaultWithdrawTransaction, TransactionRequirement.SingleAsset)
