import Asset from "../../common/assets/asset"
import AssetGroup from "../../common/assets/assetGroup"

export enum TransactionRequirement {
  NoAsset,
  SingleAsset,
  DoubleAsset,
}

export interface SingleAssetTransactionProps {
  asset: Asset
}

export interface DoubleAssetTransactionProps {
  assetGroup: AssetGroup
}

export interface TransactionRequiredProps {
  walletAddress: string
}

export interface TransactionResponse {
  state: TransactionResponseState
  hash: string
  rawLog: string
}

export enum TransactionResponseState {
  loading,
  success,
  failure,
}
