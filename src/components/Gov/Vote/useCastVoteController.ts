import { useEffect, useState } from "react"
import { useCastVote_OUTDATED } from "../../../network/transactions/gov/useCastVote"
import { CastVoteInfo, CastVoteInput } from "../../../network/types/types"

export default function useCastVoteController(pollId: number) {
  const { action, response } = useCastVote_OUTDATED()
  const [castVoteInput, setCastVoteInput] = useState<CastVoteInput>()
  const [vote, setVote] = useState<CastVoteInfo>()
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false)

  const onSubmit = async (castVoteInput: CastVoteInput) => {
    setCastVoteInput(castVoteInput)
    action(castVoteInput)
  }

  const onClose = () => {
    setVote(undefined)
    setShouldRedirect(true)
  }

  useEffect(() => {
    if (castVoteInput && response) {
      const { answer } = castVoteInput
      const { txhash } = response.result

      setVote({
        answer,
        pollId,
        txhash,
        txfee: "", // FIXME need to review how fees are handled and display appropriate values
      })
    }
  }, [castVoteInput, response, pollId])
  return { onSubmit, onClose, vote, shouldRedirect }
}
