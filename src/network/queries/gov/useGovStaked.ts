import { useQuery } from "@apollo/client"
import { useMemo } from "react"
import { useRecoilValue } from "recoil"

import { contracts } from "../../constants/foundation"
import { levanaTokenAsset } from "../../constants/foundation"
import { walletAddressState } from "../../states/walletAddress"
import {
  terraContractsStore,
  TerraContractsStorePayload,
} from "../common/terraContractsStore"
import { staker, StakerPayload } from "../common/messages/staker"
import { useLvnBalance } from "../asset/useLvnBalance"
import Asset from "../../common/assets/asset"
import { useNetworkError } from "../common/useNetworkError"

export interface Staked {
  totalLvn: Asset
  staked: Asset
  stakable: Asset
  pendingVotingRewards: Asset
}

export function useGovStaked() {
  const walletAddress = useRecoilValue(walletAddressState)

  // TODO: This impl will still make a request. Needs a solution to avoid that.
  const message = walletAddress ? JSON.stringify(staker(walletAddress)) : ""

  const { data, error, ...results } = useQuery<
    TerraContractsStorePayload<StakerPayload>
  >(terraContractsStore, {
    variables: {
      address: contracts.gov,
      message,
    },
  })

  const { asset: totalLvn } = useLvnBalance()

  const staked = useMemo<Staked | undefined>(() => {
    if (data && totalLvn) {
      const { balance, pending_voting_rewards } = data.contract.queryResult
      const lvnAddress = levanaTokenAsset.address

      const staked = new Asset(lvnAddress, balance)

      const stakable = new Asset(
        lvnAddress,
        (totalLvn.amount.toInt() - staked.amount.toInt()).toString()
      )

      const pendingVotingRewards = new Asset(lvnAddress, pending_voting_rewards)

      return { totalLvn, staked, stakable, pendingVotingRewards }
    }
  }, [data, totalLvn])

  return {
    error: useNetworkError(error),
    ...staked,
    ...results,
  }
}
