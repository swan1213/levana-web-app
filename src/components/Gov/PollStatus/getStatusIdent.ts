import {
  PollStatusFilter,
  PollStatusFilterObj,
} from "../../../network/types/types"

export function getStatusIdent(status: PollStatusFilter): string {
  switch (status) {
    case PollStatusFilterObj.all:
      return "gov.poll.list.filter.all"
    case PollStatusFilterObj.inProgress:
      return "gov.poll.list.filter.in_progress"
    case PollStatusFilterObj.passed:
      return "gov.poll.list.filter.passed"
    case PollStatusFilterObj.rejected:
      return "gov.poll.list.filter.rejected"
    case PollStatusFilterObj.executed:
      return "gov.poll.list.filter.executed"
    default:
      return "unknown"
  }
}
