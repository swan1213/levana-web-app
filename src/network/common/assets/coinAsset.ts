import { Coins } from "@terra-money/terra.js"

import { FoundationCoinAsset } from "../../constants/foundation"
import { contractAsset, contractCoin } from "./contractAsset"
import Amount from "../amount"

export default class CoinAsset {
  readonly foundationAsset: FoundationCoinAsset
  amount: Amount

  constructor(foundationAsset: FoundationCoinAsset, amount: Amount) {
    this.foundationAsset = foundationAsset
    this.amount = amount
  }

  get id() {
    return this.foundationAsset.denom
  }

  get symbol() {
    return this.foundationAsset.denom
  }

  get name() {
    return this.foundationAsset.name
  }

  get coins() {
    return new Coins({
      [this.foundationAsset.denom]: this.amount.toString(),
    })
  }

  toContractAsset() {
    return contractAsset(
      this.amount.toString(),
      contractCoin(this.foundationAsset.denom)
    )
  }
}
