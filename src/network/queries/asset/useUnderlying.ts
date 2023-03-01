import { useQuery } from "@apollo/client"
import { useMemo } from "react"

import { contracts } from "../../constants/foundation"
import { underlying, UnderlyingPayload } from "../common/messages/underlying"
import {
  terraContractsStore,
  TerraContractsStorePayload,
} from "../common/terraContractsStore"
import AssetGroup from "../../common/assets/assetGroup"
import { useNetworkError } from "../common/useNetworkError"

export function useUnderlying(assetGroup: AssetGroup) {
  const { data, error, ...results } = useQuery<
    TerraContractsStorePayload<UnderlyingPayload>
  >(terraContractsStore, {
    variables: {
      address: contracts.balancer,
      message: JSON.stringify(underlying(assetGroup.primaryAsset.id)),
    },
  })

  const ratio = useMemo<string | undefined>(() => {
    if (data) {
      return data.contract.queryResult.ratio
    }
  }, [data])

  return {
    error: useNetworkError(error),
    ratio,
    ...results,
  }
}
