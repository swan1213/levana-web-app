export interface StakingPoolPayload {
  accumulated_reward_ratio: string
  pending_rewards: string
  total_amount_bonded: string
}

export const stakingPool = (lpAddress: string) => ({
  staking_pool: {
    staking_token: lpAddress,
  },
})
