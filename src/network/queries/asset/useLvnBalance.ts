import { useQuery } from "@apollo/client"
import { useMemo } from "react"
import { useRecoilValue } from "recoil"

import { levanaTokenAsset } from "../../constants/foundation"
import { walletAddressState } from "../../states/walletAddress"
import { balance, BalancePayload } from "../common/messages/balance"
import Asset from "../../common/assets/asset"
import {
  terraContractsStore,
  TerraContractsStorePayload,
} from "../common/terraContractsStore"
import { useNetworkError } from "../common/useNetworkError"

export function useLvnBalance(pollInterval = 0) {
  const walletAddress = useRecoilValue(walletAddressState)
  const lvnAddress = levanaTokenAsset.address
  const message = walletAddress ? JSON.stringify(balance(walletAddress)) : ""

  const { data, error, ...results } = useQuery<
    TerraContractsStorePayload<BalancePayload>
  >(terraContractsStore, {
    variables: {
      address: lvnAddress,
      message,
    },
    pollInterval,
    skip: message.length === 0,
  })

  const asset = useMemo<Asset | undefined>(() => {
    if (data) {
      const { balance } = data.contract.queryResult
      return new Asset(lvnAddress, balance)
    }
  }, [data, lvnAddress])

  return {
    error: useNetworkError(error),
    asset,
    ...results,
  }
}
