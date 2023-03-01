import { gql, useQuery } from "@apollo/client"
import { useRecoilValue } from "recoil"
import { useMemo } from "react"

import { contracts, Denom } from "../../../constants/foundation"
import { walletAddressState } from "../../../states/walletAddress"
import { useNetworkError } from "../../common/useNetworkError"
import { Amount, Asset } from "../../.."
import { graphPollInterval } from "../../../constants/config"

interface UseVaultAccountReturn {
  accountAsset: Asset
}

interface VaultAccountQueryPayload {
  account: {
    queryResult: {
      balance: string
    }
  }
}

const query = gql`
  query TerraContractsStore($address: String!, $message: String!)
  @api(name: "levana") {
    account: terraContractsStore(address: $address, message: $message) {
      queryResult
    }
  }
`

export function useVaultAccount() {
  const walletAddress = useRecoilValue(walletAddressState) ?? ""

  const { data, error, ...results } = useQuery<VaultAccountQueryPayload>(
    query,
    {
      variables: {
        address: contracts.vault,
        message: JSON.stringify({ account: walletAddress }),
      },
      pollInterval: graphPollInterval,
      fetchPolicy: "cache-and-network",
      skip: walletAddress.length === 0,
    }
  )

  const returnData = useMemo<UseVaultAccountReturn | undefined>(() => {
    if (data) {
      const { balance } = data.account.queryResult

      return {
        accountAsset: new Asset(Denom.usd, new Amount(balance, true)),
      }
    }
  }, [data])

  return {
    error: useNetworkError(error),
    ...returnData,
    ...results,
  }
}
