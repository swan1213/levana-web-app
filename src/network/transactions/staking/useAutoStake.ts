import { MsgExecuteContract } from "@terra-money/terra.js/dist/core/wasm/msgs"

import { contracts } from "../../constants/foundation"
import {
  TransactionRequirement,
  DoubleAssetTransactionProps,
  TransactionRequiredProps,
} from "../common/types"
import Transaction from "../common/transaction"
import { AssetGroupType } from "../../common/assets/assetGroup"
import { transactionBuilder } from "../common/transactionBuilder"

type InternalProps = TransactionRequiredProps & DoubleAssetTransactionProps

type ExternalProps = {
  slippage: number
}

class AutoStakeTransaction extends Transaction {
  constructor(props: InternalProps & ExternalProps) {
    const { walletAddress, assetGroup, slippage } = props
    const { primaryAsset, secondaryAsset } = assetGroup
    const lliAsset = assetGroup.asset(AssetGroupType.primary)

    const execute1 = new MsgExecuteContract(walletAddress, lliAsset.id, {
      increase_allowance: {
        amount: lliAsset.amount.toString(),
        spender: contracts.staking,
      },
    })

    const execute2 = new MsgExecuteContract(
      walletAddress,
      contracts.staking,
      {
        auto_stake: {
          assets: [
            primaryAsset.toContractAsset(),
            secondaryAsset.toContractAsset(),
          ],
          slippage_tolerance: slippage.toString(),
        },
      },
      primaryAsset.coins.add(secondaryAsset.coins)
    )

    super([execute1, execute2])
  }
}

export const useAutoStake = transactionBuilder<InternalProps, ExternalProps>(
  AutoStakeTransaction,
  TransactionRequirement.DoubleAsset
)
