import { useQuery, gql } from "@apollo/client"

import { useRecoilValue } from "recoil"

import { networkState } from "../../states/network"
import { useNetworkError } from "../common/useNetworkError"

interface TreasuryQueryPayload {
  taxRate: {
    Result: string
  }
  taxCap: {
    Result: string
  }
}

const treasuryQuery = gql`
  query TreasuryQuery($denom: String!) @api(name: "mantel") {
    taxRate: TreasuryTaxRate {
      Result
    }
    taxCap: TreasuryTaxCapDenom(Denom: $denom) {
      Result
    }
  }
`

export function useTreasury() {
  const { fee } = useRecoilValue(networkState)
  const { denom } = fee

  const { data, error, ...results } = useQuery<TreasuryQueryPayload>(
    treasuryQuery,
    {
      variables: { denom },
    }
  )

  return {
    error: useNetworkError(error),
    taxRate: data?.taxRate.Result,
    taxCap: data?.taxCap.Result,
    ...results,
  }
}
