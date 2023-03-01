export interface UnderlyingPayload {
  ratio: string
}

export const underlying = (tokenAddress: string) => ({
  underlying: {
    token: tokenAddress,
  },
})
