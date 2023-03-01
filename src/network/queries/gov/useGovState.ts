import { useQuery } from "@apollo/client"
import { useMemo } from "react"

import { contracts } from "../../constants/foundation"
import {
  terraContractsStore,
  TerraContractsStorePayload,
} from "../common/terraContractsStore"
import { state, StatePayload } from "../common/messages/state"
import { useNetworkError } from "../common/useNetworkError"

export function useGovState() {
  const { data, error, ...results } = useQuery<
    TerraContractsStorePayload<StatePayload>
  >(terraContractsStore, {
    variables: {
      address: contracts.gov,
      message: JSON.stringify(state()),
    },
  })

  const statePayload = useMemo<StatePayload | undefined>(() => {
    if (data) {
      return data.contract.queryResult
    }
  }, [data])

  return {
    error: useNetworkError(error),
    state: statePayload,
    ...results,
  }
}
