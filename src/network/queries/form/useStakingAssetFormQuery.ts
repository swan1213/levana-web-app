import { gql, useQuery } from "@apollo/client"
import { useMemo } from "react"
import { useRecoilValue } from "recoil"

import { walletAddressState } from "../../states/walletAddress"
import { contracts } from "../../constants/foundation"
import {
  stakerRewards,
  StakerRewardsPayload,
} from "../common/messages/stakerRewards"
import useFee from "../../utils/treasury/useFee"
import Amount from "../../common/amount"
import { UseSingleAssetFormQueryReturn, UseSingleAssetFormQuery } from "./types"
import { graphPollInterval } from "../../constants/config"
import { useNetworkError } from "../common/useNetworkError"

interface UseStakingAssetFormQueryPayload {
  balance?: {
    balance: string
  }
  stakedBalance?: {
    queryResult: StakerRewardsPayload
  }
  feeBalance: {
    balance: string
  }
}

const query = gql`
  query TerraContractsStore(
    $stakingAddress: String!
    $stakingMessage: String!
    $feeAssetId: String!
    $walletAddress: String!
  ) @api(name: "levana") {
    stakedBalance: terraContractsStore(
      address: $stakingAddress
      message: $stakingMessage
    ) {
      queryResult
    }
    feeBalance: assetBalance(
      assetId: $feeAssetId
      walletAddress: $walletAddress
    ) {
      balance
    }
  }
`

export const useStakingAssetFormQuery: UseSingleAssetFormQuery = (props) => {
  const { assetId } = props
  const walletAddress = useRecoilValue(walletAddressState) ?? ""
  const fee = useFee()

  const stakingMessage =
    walletAddress.length > 0
      ? JSON.stringify(stakerRewards(walletAddress, assetId))
      : ""

  const { data, error, ...results } = useQuery<UseStakingAssetFormQueryPayload>(
    query,
    {
      variables: {
        stakingAddress: contracts.staking,
        stakingMessage,
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
      const { stakedBalance, feeBalance } = data

      if (stakedBalance) {
        return {
          maxAmount: new Amount(stakedBalance.queryResult.amount_bonded),
          maxFeeAmount: new Amount(feeBalance.balance),
        }
      }
    }
  }, [data])

  return {
    error: useNetworkError(error),
    ...returnData,
    ...results,
  }
}
