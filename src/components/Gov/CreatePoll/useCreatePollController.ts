import { useState, useEffect } from "react"

import { useCreatePoll_OUTDATED } from "../../../network/transactions/gov/useCreatePoll"
import { CreatedPollInfo, CreatePollInput } from "../../../network/types/types"

export default function useCreatePollController() {
  const { action, response } = useCreatePoll_OUTDATED()
  const [createPollInput, setCreatePollInput] = useState<CreatePollInput>()
  const [createdPollInfo, setCreatedPollInfo] = useState<CreatedPollInfo>()
  const [shouldRedirect, setShouldRedirect] = useState<undefined | number>(
    undefined
  )

  const onSubmit = async (createPollInput: CreatePollInput) => {
    setCreatePollInput(createPollInput)
    action(createPollInput)
  }

  const onClose = () => {
    setShouldRedirect(createdPollInfo?.pollId)
    setCreatedPollInfo(undefined)
  }

  useEffect(() => {
    if (createPollInput && response) {
      const { title, description, information } = createPollInput
      const { txhash } = response.result

      setCreatedPollInfo({
        title,
        description,
        information,
        txfee: "",
        pollId: 999, // FIXME need to get the real value from the raw_log, but not available
        txhash,
      })
    }
  }, [createPollInput, response])

  return { onSubmit, onClose, shouldRedirect, createdPollInfo }
}
