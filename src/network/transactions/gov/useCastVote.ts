import { MsgExecuteContract } from "@terra-money/terra.js/dist/core/wasm/msgs"

import { useTransaction_OUTDATED } from "../common/transactionController"
import {
  TransactionRequirement,
  SingleAssetTransactionProps,
  TransactionRequiredProps,
} from "../common/types"
import { transactionBuilder } from "../common/transactionBuilder"
import { contracts } from "../../constants/foundation"
import Transaction from "../common/transaction"
import { CastVoteInput } from "../../types/types"

type InternalProps = TransactionRequiredProps & SingleAssetTransactionProps

type ExternalProps = Omit<CastVoteInput, "deposit">

class CastVoteTransaction extends Transaction {
  constructor(props: InternalProps & ExternalProps) {
    const { walletAddress, asset, id, answer } = props

    const execute = new MsgExecuteContract(
      walletAddress,
      contracts.gov,
      {
        cast_vote: {
          amount: asset.amount.toString(),
          poll_id: id,
          vote: answer,
        },
      },
      asset.coins
    )

    super([execute])
  }
}

export const useCastVote = transactionBuilder<InternalProps, ExternalProps>(
  CastVoteTransaction,
  TransactionRequirement.SingleAsset
)

export function useCastVote_OUTDATED() {
  const { handleTransaction, response } = useTransaction_OUTDATED()

  const action = async (input: CastVoteInput) => {
    await handleTransaction((wallet) => {
      return new CastVoteTransaction({
        ...input,
        walletAddress: wallet.walletAddress,
        asset: input.deposit,
      })
    })
  }

  return { action, response }
}
