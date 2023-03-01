import { useState, useMemo } from "react"

import { Amount, Asset } from "../../../network"
import { levanaTokenAsset } from "../../../network/constants/foundation"
import { useStakeVotingTokens_OUTDATED } from "../../../network/transactions/gov/useStakeVotingTokens"
import { useWithdrawVotingTokens_OUTDATED } from "../../../network/transactions/gov/useWithdrawVotingTokens"
import { useGovStaked } from "../../../network/queries/gov/useGovStaked"

interface UseManageStakeControllerProps {
  tabKey: string
}

export default function useManageStakeController(
  props: UseManageStakeControllerProps
) {
  const { tabKey } = props
  const stake = useStakeVotingTokens_OUTDATED()
  const unstake = useWithdrawVotingTokens_OUTDATED()
  const { staked, stakable } = useGovStaked()

  const maxValue = useMemo<Asset>(() => {
    if (staked && stakable) {
      return tabKey === "stake" ? stakable : staked
    } else {
      return new Asset(levanaTokenAsset.address, "0")
    }
  }, [staked, stakable, tabKey])

  const [amount, setAmount] = useState("")
  const entered = new Asset(levanaTokenAsset.address, new Amount(amount, true))
  const hasBalanceError = entered.amount.toInt() > maxValue.amount.toInt()

  const onSubmit = async () => {
    if (tabKey === "stake") {
      const action = stake.action
      action(entered)
    } else {
      const action = unstake.action
      action(entered)
    }
  }

  return {
    onSubmit,
    stakeResponse: stake.response,
    unstakeResponse: unstake.response,
    maxValue,
    setAmount,
    hasBalanceError,
  }
}
