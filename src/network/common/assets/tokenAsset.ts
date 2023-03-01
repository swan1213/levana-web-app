import { Coins } from "@terra-money/terra.js"

import { FoundationTokenAsset } from "../../constants/foundation"
import { contractAsset, contractToken } from "./contractAsset"
import Amount from "../amount"

export default class TokenAsset {
  readonly foundationAsset: FoundationTokenAsset
  amount: Amount

  constructor(foundationAsset: FoundationTokenAsset, amount: Amount) {
    this.foundationAsset = foundationAsset
    this.amount = amount
  }

  get id() {
    return this.foundationAsset.address
  }

  get symbol() {
    return this.foundationAsset.symbol
  }

  get name() {
    return this.foundationAsset.name
  }

  get coins() {
    return new Coins()
  }

  toContractAsset() {
    return contractAsset(
      this.amount.toString(),
      contractToken(this.foundationAsset.address)
    )
  }
}
