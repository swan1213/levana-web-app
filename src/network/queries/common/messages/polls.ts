import { Poll } from "../../../types/types"

export interface PollsPayload {
  polls: Poll[]
}

export const polls = () => ({
  polls: {},
})
