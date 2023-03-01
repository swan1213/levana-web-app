import { gql, useQuery } from "@apollo/client"
import { useMemo } from "react"
import { useRecoilValue } from "recoil"

import { walletAddressState } from "../../states/walletAddress"
import { pool, PoolPayload } from "../common/messages/pool"
import Asset from "../../common/assets/asset"
import Amount from "../../common/amount"
import useFee from "../../utils/treasury/useFee"
import { UseDoubleAssetFormQuery, UseDoubleAssetFormQueryReturn } from "./types"
import { graphPollInterval } from "../../constants/config"
import { useNetworkError } from "../common/useNetworkError"

interface UseDoubleAssetFormQueryPayload {
  firstBalance: {
    balance: string
  }
  secondBalance: {
    balance: string
  }
  feeBalance: {
    balance: string
  }
  pair: {
    queryResult: PoolPayload
  }
}

const query = gql`
  query TerraContractsStore(
    $firstAssetId: String!
    $secondAssetId: String!
    $feeAssetId: String!
    $walletAddress: String!
    $pairAddress: String!
    $pairMessage: String!
  ) @api(name: "levana") {
    firstBalance: assetBalance(
      assetId: $firstAssetId
      walletAddress: $walletAddress
    ) {
      balance
    }
    secondBalance: assetBalance(
      assetId: $secondAssetId
      walletAddress: $walletAddress
    ) {
      balance
    }
    feeBalance: assetBalance(
      assetId: $feeAssetId
      walletAddress: $walletAddress
    ) {
      balance
    }
    pair: terraContractsStore(address: $pairAddress, message: $pairMessage) {
      queryResult
    }
  }
`

export const useDoubleAssetFormQuery: UseDoubleAssetFormQuery = (props) => {
  const { firstAssetId, secondAssetId, primaryAssetId, pairAddress } = props
  const walletAddress = useRecoilValue(walletAddressState) ?? ""
  const fee = useFee()

  const { data, error, ...results } = useQuery<UseDoubleAssetFormQueryPayload>(
    query,
    {
      variables: {
        firstAssetId,
        secondAssetId,
        feeAssetId: fee.asset.id,
        walletAddress,
        pairAddress,
        pairMessage: JSON.stringify(pool()),
      },
      pollInterval: graphPollInterval,
      fetchPolicy: "cache-and-network",
      skip: walletAddress.length === 0,
    }
  )

  const returnData = useMemo<UseDoubleAssetFormQueryReturn | undefined>(() => {
    if (data) {
      const { firstBalance, secondBalance, feeBalance, pair } = data
      const contractAssets = [...pair.queryResult.assets]

      const [offerPoolAsset, askPoolAsset] = contractAssets
        .map((contractAsset) => new Asset(contractAsset))
        .sort((asset) => (asset.id === primaryAssetId ? -1 : 1))

      const maxFirstAmount = new Amount(firstBalance.balance)
      const maxSecondAmount = new Amount(secondBalance.balance)

      const [maxPrimaryAmount, maxSecondaryAmount] = (() => {
        if (primaryAssetId === firstAssetId) {
          return [maxFirstAmount, maxSecondAmount]
        } else {
          return [maxSecondAmount, maxFirstAmount]
        }
      })()

      return {
        maxFirstAmount,
        maxSecondAmount,
        maxPrimaryAmount,
        maxSecondaryAmount,
        maxFeeAmount: new Amount(feeBalance.balance),
        offerPoolAsset,
        askPoolAsset,
      }
    }
  }, [data, firstAssetId, primaryAssetId])

  return {
    error: useNetworkError(error),
    ...returnData,
    ...results,
  }
}
