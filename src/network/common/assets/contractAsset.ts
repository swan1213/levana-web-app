export type ContractAsset = ReturnType<typeof contractAsset>
export type ContractAssetInfo = ReturnType<
  typeof contractCoin | typeof contractToken
>

export const contractAsset = (amount: string, info: ContractAssetInfo) => ({
  amount,
  info,
})

export const contractCoin = (denom: string) => ({
  native_token: {
    denom,
  },
})

export const contractToken = (tokenAddress: string) => ({
  token: {
    contract_addr: tokenAddress,
  },
})
