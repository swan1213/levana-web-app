import { MsgExecuteContract } from "@terra-money/terra.js/dist/core/wasm/msgs"

import { useTransaction_OUTDATED } from "../common/transactionController"
import { TransactionRequiredProps } from "../common/types"
import { contracts, levanaTokenAsset } from "../../constants/foundation"
import { CreatePollInput } from "../../types/types"
import Transaction from "../common/transaction"
import { send } from "../common/messages/send"
import { transactionBuilder } from "../common/transactionBuilder"

type InternalProps = TransactionRequiredProps

type ExternalProps = CreatePollInput

class CreatePollTransaction extends Transaction {
  constructor(props: InternalProps & ExternalProps) {
    const { walletAddress, deposit, title, description, information } = props

    const execute = new MsgExecuteContract(
      walletAddress,
      levanaTokenAsset.address,
      send(deposit.toString(), contracts.gov, {
        create_poll: {
          title,
          description,
          link: information,
        },
      })
    )

    super([execute])
  }
}

export const useCreatePoll = transactionBuilder<InternalProps, ExternalProps>(
  CreatePollTransaction
)

export function useCreatePoll_OUTDATED() {
  const { handleTransaction, response } = useTransaction_OUTDATED()

  const action = async (input: CreatePollInput) => {
    return await handleTransaction((wallet) => {
      return new CreatePollTransaction({
        ...input,
        walletAddress: wallet.walletAddress,
      })
    })
  }

  return { action, response }
}
