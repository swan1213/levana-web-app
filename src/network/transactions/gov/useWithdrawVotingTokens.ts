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
import Asset from "../../common/assets/asset"

type InternalProps = TransactionRequiredProps & SingleAssetTransactionProps

class WithdrawVotingTokensTransaction extends Transaction {
  constructor(props: InternalProps) {
    const { walletAddress, asset } = props

    const execute = new MsgExecuteContract(
      walletAddress,
      contracts.gov,
      {
        withdraw_voting_tokens: {
          amount: asset.amount.toString(),
        },
      },
      asset.coins
    )

    super([execute])
  }
}

export const useWithdrawVotingTokens = transactionBuilder<InternalProps>(
  WithdrawVotingTokensTransaction,
  TransactionRequirement.SingleAsset
)

export function useWithdrawVotingTokens_OUTDATED() {
  const { handleTransaction, response } = useTransaction_OUTDATED()

  const action = async (asset: Asset) => {
    return await handleTransaction((wallet) => {
      return new WithdrawVotingTokensTransaction({
        asset,
        walletAddress: wallet.walletAddress,
      })
    })
  }

  return { action, response }
}
