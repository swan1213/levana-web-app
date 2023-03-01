import BigNumber from "bignumber.js"

import { UseSimulation } from "./types"

export const useProportionalSimulation: UseSimulation = (props) => {
  const { offerPoolAsset, askPoolAsset, offerAmount } = props

  if (!offerPoolAsset || !askPoolAsset || !offerAmount) {
    return
  }

  const offerPool = new BigNumber(offerPoolAsset.amount.toString())
  const askPool = new BigNumber(askPoolAsset.amount.toString())

  const calculate = (amount: string | number) =>
    askPool.dividedBy(offerPool).times(amount)

  const baseAmount = calculate(1_000_000)
  const askAmount = calculate(offerAmount)

  return {
    baseAsset: askPoolAsset.new(baseAmount.integerValue().toString()),
    askAsset: askPoolAsset.new(askAmount.integerValue().toString()),
  }
}
