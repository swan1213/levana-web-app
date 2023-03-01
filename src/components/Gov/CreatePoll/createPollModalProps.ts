import { CreatedPollInfo } from "../../../network/types/types"

export interface CreatePollModalProps {
  open: boolean
  onClose: () => void
  pollInfo: CreatedPollInfo
}
