import { MsgExecuteContract } from "@terra-money/terra.js/dist/core/wasm/msgs"

import { useTransaction_OUTDATED } from "../common/transactionController"
import {
  TransactionRequirement,
  SingleAssetTransactionProps,
  TransactionRequiredProps,
} from "../common/types"
import { contracts } from "../../constants/foundation"
import { levanaTokenAsset } from "../../constants/foundation"
import Transaction from "../common/transaction"
import { transactionBuilder } from "../common/transactionBuilder"
import Asset from "../../common/assets/asset"
import { send } from "../common/messages/send"

type InternalProps = TransactionRequiredProps & SingleAssetTransactionProps

class StakeVotingTokensTransaction extends Transaction {
  constructor(props: InternalProps) {
    const { walletAddress, asset } = props

    const execute = new MsgExecuteContract(
      walletAddress,
      levanaTokenAsset.address,
      send(asset.amount.toString(), contracts.gov, {
        stake_voting_tokens: {},
      }),
      asset.coins
    )

    super([execute])
  }
}

export const useStakeVotingTokens = transactionBuilder<InternalProps>(
  StakeVotingTokensTransaction,
  TransactionRequirement.SingleAsset
)

export function useStakeVotingTokens_OUTDATED() {
  const { handleTransaction, response } = useTransaction_OUTDATED()

  const action = async (asset: Asset) => {
    return await handleTransaction((wallet) => {
      return new StakeVotingTokensTransaction({
        asset,
        walletAddress: wallet.walletAddress,
      })
    })
  }

  return { action, response }
}
