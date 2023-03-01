import { PollVoteRaw } from "../../../types/types"

export interface VotersPayload {
  voters: PollVoteRaw[]
}

export const voters = (pollId: number) => ({
  voters: {
    poll_id: pollId,
  },
})
