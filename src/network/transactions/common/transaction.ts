import { Fee } from "@terra-money/terra.js/dist/core/Fee"
import { CreateTxOptions } from "@terra-money/terra.js/dist/client/lcd/api/TxAPI"
import { Msg } from "@terra-money/terra.js/dist/core/Msg"

export default class Transaction {
  private options: CreateTxOptions
  readonly messagesLength: number
  readonly gasAdjustment: number

  constructor(messages: Msg[], gasAdjustment = 1) {
    this.options = { msgs: messages }
    this.messagesLength = messages.length
    this.gasAdjustment = gasAdjustment
  }

  fee(fee: Fee) {
    this.options.fee = fee
    return this
  }

  toObject() {
    return this.options
  }
}
