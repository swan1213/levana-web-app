import { useMemo } from "react"
import { useRecoilValue } from "recoil"
import { gql, useQuery } from "@apollo/client"

import { contracts } from "../../../constants/foundation"
import { walletAddressState } from "../../../states/walletAddress"
import { useNetworkError } from "../../common/useNetworkError"
import Amount from "../../../common/amount"

interface UseVammStatsReturn {
  stats: {
    markPrice: Amount
    spotPrice: Amount
  }
}

interface VammStatsQueryPayload {
  marketCurve: {
    queryResult: {
      price: string
    }
  }
  spotPrice: {
    queryResult: string
  }
}

const query = gql`
  query TerraContractsStore(
    $address: String!
    $marketCurveMessage: String!
    $spotPriceMessage: String!
  ) @api(name: "levana") {
    marketCurve: terraContractsStore(
      address: $address
      message: $marketCurveMessage
    ) {
      queryResult
    }
    spotPrice: terraContractsStore(
      address: $address
      message: $spotPriceMessage
    ) {
      queryResult
    }
  }
`

export function useVammStats() {
  const walletAddress = useRecoilValue(walletAddressState) ?? ""

  const { data, error, ...results } = useQuery<VammStatsQueryPayload>(query, {
    variables: {
      address: contracts.vamm,
      marketCurveMessage: JSON.stringify({ market_curve: {} }),
      spotPriceMessage: JSON.stringify({ spot_price: {} }),
    },
    skip: walletAddress.length === 0,
  })

  const returnData = useMemo<UseVammStatsReturn | undefined>(() => {
    if (data) {
      // TODO: Check that these are correct
      const markPrice = new Amount(data.marketCurve.queryResult.price, true)
      const spotPrice = new Amount(data.spotPrice.queryResult, true)

      return {
        stats: {
          markPrice,
          spotPrice,
        },
      }
    }
  }, [data])

  return {
    error: useNetworkError(error),
    ...returnData,
    ...results,
  }
}
