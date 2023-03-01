import { gql, useQuery } from "@apollo/client"
import { useMemo } from "react"
import { useRecoilValue } from "recoil"

import { walletAddressState } from "../../states/walletAddress"
import useFee from "../../utils/treasury/useFee"
import Amount from "../../common/amount"
import { UseSingleAssetFormQueryReturn, UseSingleAssetFormQuery } from "./types"
import { graphPollInterval } from "../../constants/config"
import { useNetworkError } from "../common/useNetworkError"
import { useVaultAccount } from "../perps/vault/useVaultAccount"

interface UseVaultWithdrawAssetFormQueryPayload {
  feeBalance: {
    balance: string
  }
}

const query = gql`
  query TerraContractsStore($feeAssetId: String!, $walletAddress: String!)
  @api(name: "levana") {
    feeBalance: assetBalance(
      assetId: $feeAssetId
      walletAddress: $walletAddress
    ) {
      balance
    }
  }
`

export const useVaultWithdrawAssetFormQuery: UseSingleAssetFormQuery = () => {
  const walletAddress = useRecoilValue(walletAddressState) ?? ""
  const fee = useFee()

  const { data, error, ...results } =
    useQuery<UseVaultWithdrawAssetFormQueryPayload>(query, {
      variables: {
        feeAssetId: fee.asset.id,
        walletAddress,
      },
      pollInterval: graphPollInterval,
      fetchPolicy: "cache-and-network",
      skip: walletAddress.length === 0,
    })

  const vaultAccount = useVaultAccount()

  const returnData = useMemo<UseSingleAssetFormQueryReturn | undefined>(() => {
    if (data && vaultAccount.accountAsset) {
      const { feeBalance } = data

      return {
        maxAmount: vaultAccount.accountAsset.amount,
        maxFeeAmount: new Amount(feeBalance.balance),
      }
    }
  }, [data, vaultAccount.accountAsset])

  return {
    error: useNetworkError(error) ?? vaultAccount.error,
    ...returnData,
    ...results,
  }
}
