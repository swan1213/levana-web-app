import { Fee } from "@terra-money/terra.js/dist/core/Fee"
import { useCallback, useMemo } from "react"

import { useRecoilValue } from "recoil"

import { Asset } from "../.."
// import { useTreasury } from "../treasury/useTreasury"
import { networkState } from "../../states/network"

export default function useFee() {
  const { fee } = useRecoilValue(networkState)
  const { gasPrice, denom, amount: feeAmount } = fee
  // const { taxRate, taxCap } = useTreasury()

  const calculate = useCallback(
    (messagesLength = 1, gasAdjustment = 1) => {
      // TODO: use bignumber.js
      const amount = feeAmount * messagesLength * gasAdjustment
      const gas = Math.round(amount / gasPrice)
      const fee = new Fee(gas, { [denom]: amount })

      return { amount, gas, fee }
    },
    [feeAmount, gasPrice, denom]
  )

  // const tax = (amount = 0) => {
  //   if (taxRate && taxCap) {
  //     return Math.min(taxCap.amount.toNumber(), amount * taxRate.toNumber())
  //   }

  //   return 0
  // }

  const asset = useMemo(() => new Asset(denom), [denom])

  return { calculate, asset }
}
