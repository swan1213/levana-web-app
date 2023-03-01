import { Asset } from "../../network"
import { UseFormAssetGroupReturn } from "../../network/common/assets/useFormAssetCollection"

export interface AssetInputActiveProps {
  onActive?: () => void
}

export interface AssetInputSubProps {
  padding: number
  readOnly?: boolean
}

export interface AssetInputAssets {
  assets: Asset[]
}

export interface AssetInputAmountState {
  amount: UseFormAssetGroupReturn["firstAmount"]
  setAmount?: UseFormAssetGroupReturn["setFirstAmount"]
}

export type AssetInputIndexState = Pick<
  UseFormAssetGroupReturn,
  "assetIndex" | "setAssetIndex"
>
