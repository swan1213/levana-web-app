import { AccAddress } from "@terra-money/terra.js/dist/core/bech32"

import CoinAsset from "./coinAsset"
import TokenAsset from "./tokenAsset"
import {
  FoundationAsset,
  FoundationCoinAsset,
  FoundationTokenAsset,
} from "../../constants/foundation"
import Amount from "../amount"
import { NetworkError, NetworkErrorKey } from "../../errors/networkError"
import { ContractAsset } from "./contractAsset"
import {
  addressesMap,
  symbolsMap,
  denomsMap,
} from "../../constants/foundationAssetMaps"

type AssetId = FoundationAsset | ContractAsset | string
type AssetAmount = Amount | string | number

export default class Asset {
  readonly symbol: string
  readonly isNative: boolean
  private asset: CoinAsset | TokenAsset

  // !!!: possibly remove this function
  // this pattern encourages setting the asset class in useEffect instead of
  // asset.id and/or asset.amount. setting the class will make unexpected
  // additional calls with useEffect.
  new(amount: AssetAmount = "") {
    if (this.asset instanceof CoinAsset) {
      return new Asset(this.asset.foundationAsset, amount)
    } else {
      return new Asset(this.asset.foundationAsset, amount)
    }
  }

  // TODO: create a toData function with returns { id: string, amount: string }
  // this can replace the above function and have better support with useEffect

  // Coin
  constructor(denom: string, amount?: AssetAmount)
  constructor(foundationCoinAsset: FoundationCoinAsset, amount?: AssetAmount)

  // Token
  constructor(symbol: string, amount?: AssetAmount)
  constructor(address: string, amount?: AssetAmount)
  constructor(foundationTokenAsset: FoundationTokenAsset, amount?: AssetAmount)

  // Convert
  constructor(foundationAsset: FoundationAsset)
  constructor(contractAsset: ContractAsset)

  constructor(id: AssetId, amount: AssetAmount = "") {
    const asset = this.createAsset(id, amount)

    if (!asset) {
      console.error(id)
      throw new NetworkError(NetworkErrorKey.invalidAsset)
    }

    this.asset = asset
    this.isNative = this.asset instanceof CoinAsset
    this.symbol = this.asset.symbol
  }

  private createAsset(id: AssetId, amount: AssetAmount) {
    // ContractAsset
    if (typeof id !== "string" && "info" in id) {
      amount = id.amount

      if ("token" in id.info) {
        id = id.info.token.contract_addr
      } else {
        id = id.info.native_token.denom
      }
    }

    if (typeof amount === "string" || typeof amount === "number") {
      amount = new Amount(amount)
    }

    // FoundationAsset
    if (typeof id !== "string" && "name" in id) {
      if ("symbol" in id) {
        return new TokenAsset(id, amount)
      } else if ("denom" in id) {
        return new CoinAsset(id, amount)
      }
    }

    if (AccAddress.validate(id)) {
      const foundationTokenAsset = addressesMap[id]

      if (foundationTokenAsset) {
        return new TokenAsset(foundationTokenAsset, amount)
      }

      return undefined
    } else {
      const foundationTokenAsset = symbolsMap[id]

      if (foundationTokenAsset) {
        return new TokenAsset(foundationTokenAsset, amount)
      }

      const foundationCoinAsset = denomsMap[id]

      if (foundationCoinAsset) {
        return new CoinAsset(foundationCoinAsset, amount)
      }

      return undefined
    }
  }

  get id() {
    return this.asset.id
  }

  get name() {
    return this.asset.name
  }

  get amount() {
    return this.asset.amount
  }

  set amount(amount: Amount) {
    this.asset.amount = amount
  }

  toFormattedAmount(decimalPlaces?: number) {
    return `${this.amount.toDecimal(decimalPlaces, true)} ${this.symbol}`
  }

  toNameFormattedAmount(decimalPlaces?: number) {
    return `${this.amount.toDecimal(decimalPlaces, true)} ${this.name}`
  }

  toFormattedAbbreviateAmount() {
    return `${this.amount.toAbbreviate()} ${this.symbol}`
  }

  get coins() {
    return this.asset.coins
  }

  toContractAsset() {
    return this.asset.toContractAsset()
  }
}
