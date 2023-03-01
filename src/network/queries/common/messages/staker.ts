export interface StakerPayload {
  balance: string
  share: string
  pending_voting_rewards: string
}

export const staker = (walletAddress: string) => ({
  staker: {
    address: walletAddress,
  },
})
