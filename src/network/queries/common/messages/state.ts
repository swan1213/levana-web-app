export interface StatePayload {
  poll_count: number
  total_share: string
  total_deposit: string
  pending_voting_rewards: string
}

export const state = () => ({
  state: {},
})
