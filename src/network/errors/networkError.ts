import {
  Timeout,
  UserDenied,
  CreateTxFailed,
} from "@terra-money/wallet-provider"

export enum NetworkErrorKey {
  insufficientFunds = "error.network.insufficientFunds",
  insufficientFeeFunds = "error.network.insufficientFeeFunds",
  internal = "error.network.internal",
  invalidAsset = "error.network.invalidAsset",
  missingWallet = "error.network.missingWallet",
  queryFailed = "error.network.queryFailed",
  timeout = "error.network.timeout",
  transactionFailed = "error.network.transactionFailed",
  userDenied = "error.network.userDenied",
}

export class NetworkError extends Error {
  constructor(key: NetworkErrorKey, message?: string) {
    super(message)
    this.name = key.toString()
    console.warn(this)
  }

  static fromWalletProvider(error: Error): NetworkError {
    if (error instanceof NetworkError) {
      return error
    }

    const message = error.toString()

    if (error instanceof UserDenied) {
      return new NetworkError(NetworkErrorKey.userDenied, message)
    } else if (error instanceof Timeout) {
      return new NetworkError(NetworkErrorKey.timeout, message)
    } else if (error instanceof CreateTxFailed) {
      return new NetworkError(NetworkErrorKey.insufficientFeeFunds, message)
    } else if (error.message.includes("insufficient funds")) {
      return new NetworkError(NetworkErrorKey.insufficientFunds, message)
    } else {
      return new NetworkError(NetworkErrorKey.transactionFailed, message)
    }
  }
}
