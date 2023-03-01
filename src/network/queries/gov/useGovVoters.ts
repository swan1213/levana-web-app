import { useQuery } from "@apollo/client"
import { useMemo } from "react"

import { contracts } from "../../constants/foundation"
import { levanaTokenAsset } from "../../constants/foundation"
import {
  terraContractsStore,
  TerraContractsStorePayload,
} from "../common/terraContractsStore"
import { voters, VotersPayload } from "../common/messages/voters"
import { PollVote, VoteOption } from "../../types/types"
import Asset from "../../common/assets/asset"
import { useNetworkError } from "../common/useNetworkError"

export function useGovVoters(pollId: number) {
  const { data, error, ...results } = useQuery<
    TerraContractsStorePayload<VotersPayload>
  >(terraContractsStore, {
    variables: {
      address: contracts.gov,
      message: JSON.stringify(voters(pollId)),
    },
  })

  const list = useMemo<PollVote[] | undefined>(() => {
    if (data) {
      const { voters } = data.contract.queryResult

      const voteOption = (vote: string) => {
        switch (vote) {
          case "yes":
            return VoteOption.YES
          case "no":
            return VoteOption.NO
          default:
            return VoteOption.ABSTAIN
        }
      }

      return voters.map(
        (raw): PollVote => ({
          voter: raw.voter,
          vote: voteOption(raw.vote),
          balance: new Asset(levanaTokenAsset.address, raw.balance),
        })
      )
    }
  }, [data])

  return {
    error: useNetworkError(error),
    voters: list,
    ...results,
  }
}
