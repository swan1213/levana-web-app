export interface TokenInfoPayload {
  name: string
  symbol: string
  decimals: number
  total_supply: string
}

export const tokenInfo = () => ({
  token_info: {},
})
