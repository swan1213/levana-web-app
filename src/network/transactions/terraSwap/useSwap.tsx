import { MsgExecuteContract } from "@terra-money/terra.js/dist/core/wasm/msgs"

import {
  TransactionRequirement,
  TransactionRequiredProps,
  DoubleAssetTransactionProps,
} from "../common/types"
import Transaction from "../common/transaction"
import { transactionBuilder } from "../common/transactionBuilder"
import { send } from "../common/messages/send"
import { defaultSlippageTolerance } from "../../constants/config"

type InternalProps = TransactionRequiredProps & DoubleAssetTransactionProps

class SwapTransaction extends Transaction {
  constructor(props: InternalProps) {
    const { walletAddress, assetGroup } = props
    const { primaryAsset, secondaryAsset, pairAddress } = assetGroup
    let execute: MsgExecuteContract

    if (primaryAsset.isNative) {
      execute = new MsgExecuteContract(
        walletAddress,
        pairAddress,
        {
          swap: {
            offer_asset: primaryAsset.toContractAsset(),
            to: walletAddress,
          },
        },
        primaryAsset.coins.add(secondaryAsset.coins)
      )
    } else {
      execute = new MsgExecuteContract(
        walletAddress,
        primaryAsset.id,
        send(primaryAsset.amount.toString(), pairAddress, {
          swap: {
            belief_price: secondaryAsset.amount.toString(),
            max_spread: defaultSlippageTolerance.toString(),
          },
        })
      )
    }

    super([execute])
  }
}

export const useSwap = transactionBuilder<InternalProps>(
  SwapTransaction,
  TransactionRequirement.DoubleAsset
)
