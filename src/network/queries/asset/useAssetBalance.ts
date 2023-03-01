import { useQuery, gql } from "@apollo/client"
import { useMemo } from "react"
import { useRecoilValue } from "recoil"

import { walletAddressState } from "../../states/walletAddress"
import Asset from "../../common/assets/asset"
import { useNetworkError } from "../common/useNetworkError"

interface AssetBalanceQueryPayload {
  query: {
    balance: string
  }
}

const assetBalanceQuery = gql`
  query BalanceQuery($assetId: String!, $walletAddress: String!)
  @api(name: "levana") {
    query: assetBalance(assetId: $assetId, walletAddress: $walletAddress) {
      balance
    }
  }
`

export function useAssetBalance(asset: Asset, pollInterval = 15_000) {
  const walletAddress = useRecoilValue(walletAddressState) ?? ""

  const { data, error, ...results } = useQuery<AssetBalanceQueryPayload>(
    assetBalanceQuery,
    {
      variables: {
        assetId: asset.id,
        walletAddress,
      },
      pollInterval,
      skip: walletAddress.length === 0,
    }
  )

  const queriedAsset = useMemo<Asset | undefined>(() => {
    if (data) {
      const { balance } = data.query
      return asset.new(balance)
    }
  }, [data, asset])

  return {
    error: useNetworkError(error),
    asset: queriedAsset,
    ...results,
  }
}
