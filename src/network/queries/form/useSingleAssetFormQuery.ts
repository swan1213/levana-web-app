import { gql, useQuery } from "@apollo/client"
import { useMemo } from "react"
import { useRecoilValue } from "recoil"

import { walletAddressState } from "../../states/walletAddress"
import useFee from "../../utils/treasury/useFee"
import Amount from "../../common/amount"
import { UseSingleAssetFormQueryReturn, UseSingleAssetFormQuery } from "./types"
import { graphPollInterval } from "../../constants/config"
import { useNetworkError } from "../common/useNetworkError"

interface UseSingleAssetFormQueryPayload {
  assetBalance: {
    balance: string
  }
  feeBalance: {
    balance: string
  }
}

const query = gql`
  query TerraContractsStore(
    $assetId: String!
    $feeAssetId: String!
    $walletAddress: String!
  ) @api(name: "levana") {
    assetBalance: assetBalance(
      assetId: $assetId
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
  }
`

export const useSingleAssetFormQuery: UseSingleAssetFormQuery = (props) => {
  const { assetId } = props
  const walletAddress = useRecoilValue(walletAddressState) ?? ""
  const fee = useFee()

  const { data, error, ...results } = useQuery<UseSingleAssetFormQueryPayload>(
    query,
    {
      variables: {
        assetId,
        feeAssetId: fee.asset.id,
        walletAddress,
      },
      pollInterval: graphPollInterval,
      fetchPolicy: "cache-and-network",
      skip: walletAddress.length === 0,
    }
  )

  const returnData = useMemo<UseSingleAssetFormQueryReturn | undefined>(() => {
    if (data) {
      const { assetBalance, feeBalance } = data

      return {
        maxAmount: new Amount(assetBalance.balance),
        maxFeeAmount: new Amount(feeBalance.balance),
      }
    }
  }, [data])

  return {
    error: useNetworkError(error),
    ...returnData,
    ...results,
  }
}
