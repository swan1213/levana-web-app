import { ApolloError } from "@apollo/client"
import { useMemo } from "react"

import { NetworkError, NetworkErrorKey } from "../../errors/networkError"

export function useNetworkError(error: ApolloError | undefined) {
  return useMemo(() => {
    if (error) {
      return new NetworkError(NetworkErrorKey.queryFailed, error.message)
    }
  }, [error])
}
