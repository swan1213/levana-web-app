import BigNumber from "bignumber.js"

import { UseSimulation } from "./types"

export const useTerraSwapSimulation: UseSimulation = (props) => {
  const { offerPoolAsset, askPoolAsset, offerAmount } = props

  if (!offerPoolAsset || !askPoolAsset || !offerAmount) {
    return
  }

  const commissionRate = 0.003
  const offerPool = new BigNumber(offerPoolAsset.amount.toString())
  const askPool = new BigNumber(askPoolAsset.amount.toString())
  const commissionPool = offerPool.times(askPool)

  const calculate = (amount: string | number) => {
    const returnAmount = askPool.minus(
      commissionPool.dividedBy(offerPool.plus(amount))
    )
    const commissionAmount = returnAmount.times(commissionRate)
    const askAmount = returnAmount.minus(commissionAmount)
    return { askAmount, commissionAmount }
  }

  const { askAmount: baseAmount } = calculate(1_000_000)
  const { askAmount, commissionAmount } = calculate(offerAmount)

  return {
    baseAsset: askPoolAsset.new(baseAmount.integerValue().toString()),
    askAsset: askPoolAsset.new(askAmount.integerValue().toString()),
    feeAsset: askPoolAsset.new(commissionAmount.integerValue().toString()),
  }
}
