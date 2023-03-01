import { useQuery } from "@apollo/client"
import { useMemo } from "react"

import { contracts } from "../../constants/foundation"
import {
  indexTokenInfo,
  IndexTokenInfoPayload,
} from "../common/messages/indexTokenInfo"
import {
  terraContractsStore,
  TerraContractsStorePayload,
} from "../common/terraContractsStore"
import AssetGroup from "../../common/assets/assetGroup"
import { useNetworkError } from "../common/useNetworkError"

export interface UseIndexTokenInfoReturn {
  rebalanceInfo: {
    targetRatio: string
    minRatio: string
    maxRatio: string
  }
  maxSlippage: string
  taxSlippage: string
}

export function useIndexTokenInfo(assetGroup: AssetGroup) {
  const { data, error, ...results } = useQuery<
    TerraContractsStorePayload<IndexTokenInfoPayload>
  >(terraContractsStore, {
    variables: {
      address: contracts.balancer,
      message: JSON.stringify(indexTokenInfo(assetGroup.primaryAsset.id)),
    },
  })

  const indexTokenInfoData = useMemo<
    UseIndexTokenInfoReturn | undefined
  >(() => {
    if (data) {
      const { index_info } = data.contract.queryResult
      const { rebalance_info, max_slippage, tax_slippage } = index_info
      const { target_ratio, min_ratio, max_ratio } = rebalance_info

      return {
        rebalanceInfo: {
          targetRatio: target_ratio,
          minRatio: min_ratio,
          maxRatio: max_ratio,
        },
        maxSlippage: max_slippage,
        taxSlippage: tax_slippage,
      }
    }
  }, [data])

  return {
    error: useNetworkError(error),
    ...indexTokenInfoData,
    ...results,
  }
}
