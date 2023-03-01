import { gql, useLazyQuery } from "@apollo/client"
import { useEffect, useMemo, useState } from "react"

import {
  TransactionResponse,
  TransactionResponseState,
} from "../../transactions/common/types"
import { useNetworkError } from "../common/useNetworkError"

interface UseTransactionInfoPayload {
  info:
    | {
        hash: string
        success: boolean
        rawLog: string
      }
    | {
        hash: null
        success: null
        rawLog: null
      }
}

const query = gql`
  query TransactionInfo($hash: String!) @api(name: "levana") {
    info: transactionInfo(hash: $hash) {
      success
      hash
      rawLog
    }
  }
`

const defaultPollInterval = 1_000

export function useTransactionInfo() {
  const [pollIteration, setPollIteration] = useState(0)

  const [lazyFetch, { data, error, startPolling, stopPolling, ...options }] =
    useLazyQuery<UseTransactionInfoPayload>(query, {
      fetchPolicy: "no-cache",
    })

  useEffect(() => {
    if (data) {
      if (data.info.rawLog) {
        stopPolling()
      }

      setPollIteration((prevPollIteration) => prevPollIteration + 1)
    }
  }, [data, stopPolling])

  useEffect(() => {
    if (pollIteration > defaultPollInterval * 10) {
      stopPolling()
      startPolling((pollIteration / 2) * defaultPollInterval)
    }
  }, [pollIteration, stopPolling, startPolling])

  const fetch = (hash: string) => {
    lazyFetch({ variables: { hash } })
    setPollIteration(0)
    startPolling(defaultPollInterval)
  }

  const response = useMemo<TransactionResponse | undefined>(() => {
    if (data && data.info.rawLog) {
      const { hash, success, rawLog } = data.info

      return {
        state: success
          ? TransactionResponseState.success
          : TransactionResponseState.failure,
        hash,
        rawLog,
      }
    }
  }, [data])

  return {
    error: useNetworkError(error),
    response,
    fetch,
    ...options,
  }
}
