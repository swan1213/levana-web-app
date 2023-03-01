export interface BalancePayload {
  balance: string
}

export const balance = (address: string) => ({
  balance: {
    address,
  },
})
