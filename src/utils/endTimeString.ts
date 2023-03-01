import { Poll } from "../network/types/types"

export function endTimeString(poll: Poll): string {
  return new Date(poll.end_time * 1000).toLocaleString()
}
