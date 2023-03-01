export interface StakerRewardsPayload {
  amount_bonded: string
  last_reward_ratio: string
  pending_rewards: string
}

export const stakerRewards = (walletAddress: string, tokenAddress: string) => ({
  staker_rewards: {
    staker: walletAddress,
    staking_token: tokenAddress,
  },
})
