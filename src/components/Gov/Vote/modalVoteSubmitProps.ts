export interface ModalVoteSubmitProps {
  answer: string | null
  id: string
  onClose: () => void
  open: boolean
  txFee: string
  txHash: string
}
