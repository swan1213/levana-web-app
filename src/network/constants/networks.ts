import { NetworkInfo as TerraNetworkInfo } from "@terra-money/wallet-provider"

import { GraphClients } from "../clients/apolloClient"
import { Denom } from "./foundation"

export type LevanaNetworkInfo = GraphClients & {
  fee: {
    gasPrice: number
    amount: number
    denom: string
  }
}

export type NetworkInfo = LevanaNetworkInfo & TerraNetworkInfo

export enum Network {
  mainnet = "mainnet",
  testnet = "testnet",
}

interface Networks {
  [Network.mainnet]: LevanaNetworkInfo
  [Network.testnet]: LevanaNetworkInfo
}

export const networks: Networks = {
  [Network.mainnet]: {
    levana: "https://g9cszqsjvh.execute-api.ap-northeast-2.amazonaws.com",
    // mantel: "https://mantle.terra.dev",
    mantel: "https://bombay-mantle.terra.dev",
    fee: { gasPrice: 0.3, amount: 300000, denom: Denom.usd },
  },
  [Network.testnet]: {
    levana: "https://tlkahn6v83.execute-api.ap-northeast-2.amazonaws.com",
    mantel: "https://bombay-mantle.terra.dev",
    fee: { gasPrice: 0.15, amount: 150000, denom: Denom.usd },
  },
}

export const defaultNetwork =
  process.env.NODE_ENV === "production" ? networks.mainnet : networks.testnet

export const defaultTerraNetwork = (networkInfos: TerraNetworkInfo[]) =>
  networkInfos.find((networkInfo) => {
    if (process.env.NODE_ENV === "production") {
      return networkInfo.name === Network.mainnet
    } else {
      return networkInfo.name === Network.testnet
    }
  })
