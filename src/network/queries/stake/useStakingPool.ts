import { gql, useQuery } from "@apollo/client"
import { useRecoilValue } from "recoil"
import { useMemo } from "react"

import { contracts } from "../../constants/foundation"
import { levanaTokenAsset } from "../../constants/foundation"
import { walletAddressState } from "../../states/walletAddress"
import { stakingPool, StakingPoolPayload } from "../common/messages/stakingPool"
import {
  stakerRewards,
  StakerRewardsPayload,
} from "../common/messages/stakerRewards"
import Asset from "../../common/assets/asset"
import { useNetworkError } from "../common/useNetworkError"

interface UseStakingPoolReturn {
  pool: {
    totalBondedAsset: Asset
  }
  staker?: {
    bondedAsset: Asset
    rewardAsset: Asset
  }
}

interface StakingPoolQueryPayload {
  pool: {
    queryResult: StakingPoolPayload
  }
  staker?: {
    queryResult: StakerRewardsPayload
  }
}

const stakingPoolQuery = gql`
  query TerraContractsStore(
    $address: String!
    $poolMessage: String!
    $stakerMessage: String!
    $hasStaker: Boolean!
  ) @api(name: "levana") {
    pool: terraContractsStore(address: $address, message: $poolMessage) {
      queryResult
    }
    staker: terraContractsStore(address: $address, message: $stakerMessage)
      @include(if: $hasStaker) {
      queryResult
    }
  }
`

export function useStakingPool(lpAddress: string) {
  const walletAddress = useRecoilValue(walletAddressState)

  const stakerMessage = walletAddress
    ? JSON.stringify(stakerRewards(walletAddress, lpAddress))
    : ""

  const { data, error, ...results } = useQuery<StakingPoolQueryPayload>(
    stakingPoolQuery,
    {
      variables: {
        address: contracts.staking,
        poolMessage: JSON.stringify(stakingPool(lpAddress)),
        stakerMessage,
        hasStaker: stakerMessage.length > 0,
      },
    }
  )

  const stakeData = useMemo<UseStakingPoolReturn | undefined>(() => {
    if (data) {
      const { total_amount_bonded } = data.pool.queryResult

      return {
        pool: {
          totalBondedAsset: new Asset(lpAddress, total_amount_bonded),
        },
        staker: (() => {
          if (data.staker) {
            const { amount_bonded, pending_rewards } = data.staker.queryResult

            return {
              bondedAsset: new Asset(lpAddress, amount_bonded),
              rewardAsset: new Asset(levanaTokenAsset.address, pending_rewards),
            }
          }
        })(),
      }
    }
  }, [data, lpAddress])

  return {
    error: useNetworkError(error),
    ...stakeData,
    ...results,
  }
}
