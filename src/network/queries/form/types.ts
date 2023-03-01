import { QueryResult } from "@apollo/client"

import Amount from "../../common/amount"
import Asset from "../../common/assets/asset"
import { NetworkError } from "../../errors/networkError"

type UseFormQuery<P, R> = (props: P) => Partial<R> &
  Omit<QueryResult, "data" | "error"> & {
    error?: NetworkError
  }

export type UseSingleAssetFormQuery = UseFormQuery<
  UseSingleAssetFormQueryProps,
  UseSingleAssetFormQueryReturn
>

export interface UseSingleAssetFormQueryProps {
  assetId: string
}

export interface UseSingleAssetFormQueryReturn {
  maxAmount: Amount
  maxFeeAmount: Amount
}

export type UseDoubleAssetFormQuery = UseFormQuery<
  UseDoubleAssetFormQueryProps,
  UseDoubleAssetFormQueryReturn
>

export interface UseDoubleAssetFormQueryProps {
  firstAssetId: string
  secondAssetId: string
  primaryAssetId: string
  pairAddress: string
}

export interface UseDoubleAssetFormQueryReturn {
  maxFirstAmount: Amount
  maxSecondAmount: Amount
  maxPrimaryAmount: Amount
  maxSecondaryAmount: Amount
  maxFeeAmount: Amount
  offerPoolAsset: Asset
  askPoolAsset: Asset
}
