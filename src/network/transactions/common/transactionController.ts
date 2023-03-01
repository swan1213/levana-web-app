import {
  useConnectedWallet,
  TxResult,
  ConnectedWallet,
} from "@terra-money/wallet-provider"
import { useState, useMemo, useEffect, useReducer } from "react"

import Transaction from "./transaction"
import useFee from "../../utils/treasury/useFee"
import { NetworkError, NetworkErrorKey } from "../../errors/networkError"
import { Asset } from "../.."
import { useTransactionInfo } from "../../queries/form/useTransactionInfo"
import { TransactionRequiredProps, TransactionResponseState } from "./types"
import { ResultType } from "../../types/reducer"
import {
  transactionResultReducer,
  TransactionResultState,
} from "./transactionResultReducer"

/* eslint-disable indent */

export interface TransactionControllerProps<TransactionProps> {
  create: (props: TransactionProps & TransactionRequiredProps) => Transaction
}

export interface TransactionControllerReturn<TransactionProps> {
  useTransaction: (props: TransactionProps) => UseTransactionReturn
}

export interface UseTransactionReturn {
  feeAsset: Asset
  action: () => void
  result: TransactionResultState
}

export const transactionController = <TransactionProps>(
  props: TransactionControllerProps<TransactionProps>
): TransactionControllerReturn<TransactionProps> => {
  const { create } = props

  const useTransaction = (transactionProps: TransactionProps) => {
    const txProps = useMemo(
      () => (transactionProps ?? {}) as TransactionProps,
      [transactionProps]
    )
    const wallet = useConnectedWallet()
    const transactionInfo = useTransactionInfo()
    const [result, resultDispatch] = useReducer(transactionResultReducer, {})
    const { calculate, asset } = useFee()
    const feeAssetId = asset.id

    useEffect(() => {
      if (transactionInfo.response) {
        resultDispatch({
          type: ResultType.response,
          response: transactionInfo.response,
        })
      }
    }, [transactionInfo.response])

    useEffect(() => {
      if (transactionInfo.error) {
        resultDispatch({
          type: ResultType.error,
          error: transactionInfo.error,
        })
      }
    }, [transactionInfo.error])

    const feeAsset = useMemo(() => {
      const transaction = create({ walletAddress: "", ...txProps })
      const { fee } = calculate(
        transaction.messagesLength,
        transaction.gasAdjustment
      )
      const data = fee.amount.get(feeAssetId)?.toData()
      const amount = data?.amount ?? "0"

      return new Asset(feeAssetId, amount)
    }, [txProps, calculate, feeAssetId])

    const action = async () => {
      if (!wallet) {
        resultDispatch({
          type: ResultType.error,
          error: new NetworkError(NetworkErrorKey.missingWallet),
        })
        return
      }

      resultDispatch({ type: ResultType.pending })

      const transaction = create({
        walletAddress: wallet.walletAddress,
        ...txProps,
      })
      const { fee } = calculate(
        transaction.messagesLength,
        transaction.gasAdjustment
      )

      transaction.fee(fee)

      try {
        const { success, result } = await wallet.post(transaction.toObject())

        resultDispatch({
          type: ResultType.response,
          response: {
            state: success
              ? TransactionResponseState.loading
              : TransactionResponseState.failure,
            hash: result.txhash,
            rawLog: result.raw_log,
          },
        })

        if (success) {
          transactionInfo.fetch(result.txhash)
        }
      } catch (error) {
        if (error instanceof Error) {
          resultDispatch({
            type: ResultType.error,
            error: NetworkError.fromWalletProvider(error),
          })
        }
      }
    }

    return { feeAsset, action, result }
  }

  return { useTransaction }
}

//

export function useTransaction_OUTDATED() {
  const [response, setResponse] = useState<TxResult>()
  const { calculate } = useFee()
  const wallet = useConnectedWallet()

  const handleTransaction = async (
    callback: (wallet: ConnectedWallet) => Transaction
  ) => {
    if (!wallet) {
      throw new NetworkError(NetworkErrorKey.missingWallet)
    }

    setResponse(undefined)

    const transaction = callback(wallet)
    const { fee } = calculate(
      transaction.messagesLength,
      transaction.gasAdjustment
    )

    transaction.fee(fee)

    try {
      const response = await wallet.post(transaction.toObject())
      setResponse(response)
      return response.success
    } catch (error) {
      console.warn(error)

      if (error instanceof Error) {
        throw NetworkError.fromWalletProvider(error)
      }

      throw error
    }
  }

  return { handleTransaction, response }
}
