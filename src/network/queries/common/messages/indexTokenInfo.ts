export interface IndexTokenInfoPayload {
  token: string
  index_info: {
    rebalance_info: {
      target_ratio: string
      min_ratio: string
      max_ratio: string
      // rebalance_interval: string
    }
    // min_rebalance_amount_ust: string
    max_slippage: string
    tax_slippage: string
  }
}

export const indexTokenInfo = (tokenAddress: string) => ({
  index_token_info: {
    token: tokenAddress,
  },
})
