import { useQuery } from "@apollo/client"
import { useMemo } from "react"

import { contracts } from "../../constants/foundation"
import {
  terraContractsStore,
  TerraContractsStorePayload,
} from "../common/terraContractsStore"
import { polls, PollsPayload } from "../common/messages/polls"
import { Poll } from "../../types/types"
import { useNetworkError } from "../common/useNetworkError"

export function useGovPolls() {
  const { data, error, ...results } = useQuery<
    TerraContractsStorePayload<PollsPayload>
  >(terraContractsStore, {
    variables: {
      address: contracts.gov,
      message: JSON.stringify(polls()),
    },
  })

  const list = useMemo<Poll[] | undefined>(() => {
    if (data) {
      return data.contract.queryResult.polls
    }
  }, [data])

  return {
    error: useNetworkError(error),
    polls: list,
    ...results,
  }
}
