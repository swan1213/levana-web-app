import { MsgExecuteContract } from "@terra-money/terra.js/dist/core/wasm/msgs"

import { contracts } from "../../constants/foundation"
import {
  TransactionRequirement,
  TransactionRequiredProps,
  SingleAssetTransactionProps,
} from "../common/types"
import Transaction from "../common/transaction"
import { transactionBuilder } from "../common/transactionBuilder"

type InternalProps = TransactionRequiredProps & SingleAssetTransactionProps

class RedeemTransaction extends Transaction {
  constructor(props: InternalProps) {
    const { walletAddress, asset: lpAsset } = props

    const execute = new MsgExecuteContract(walletAddress, contracts.staking, {
      redeem: {
        staking_token: lpAsset.id,
      },
    })

    super([execute])
  }
}

export const useRedeem = transactionBuilder<InternalProps>(
  RedeemTransaction,
  TransactionRequirement.SingleAsset
)
