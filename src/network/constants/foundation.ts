export interface FoundationAssetGroup {
  identifier: LLISymbol
  primary: FoundationAsset
  secondary: FoundationAsset
  lp: FoundationAsset
  pairAddress: string
}

export type FoundationAsset = FoundationCoinAsset | FoundationTokenAsset

export interface FoundationCoinAsset {
  name: string
  denom: string
}

export interface FoundationTokenAsset {
  name: string
  symbol: string
  address: string
}

export enum Denom {
  luna = "uluna",
  usd = "uusd",
}

export enum LLISymbol {
  luna2x = "llunafii",
  lvn = "lvn",
}

export const contracts = {
  // lli
  balancer: "terra1n0u609359307yyw8qa6mmejtg9wj6xlrlyh9n4",
  gov: "terra1hxw8xkc0h3upw8u8vadrfty4qt90nds82s9drd",
  staking: "terra1h422zwahfdlnlqqe8csnyv4cprncdcy66rk2p6",

  // perps
  vault: "terra1twp2848ldvj4yw2j33rey9e7054m392phyf5yy",
  vamm: "terra1nac7ndp40fzswwv2luv5f76p82psy36qlva43y",
}

export const levanaTokenAsset: FoundationTokenAsset = {
  name: "Levana",
  symbol: LLISymbol.lvn,
  address: "terra1w778rhsp4yacxpc2zrkxy0l4f3gz05a03q50hm",
}

export const foundationAssetGroups: FoundationAssetGroup[] = [
  {
    identifier: LLISymbol.luna2x,
    primary: {
      name: "Luna2x",
      symbol: LLISymbol.luna2x,
      address: "terra1dmpz8fypeyywexaevpp4dzflah5ds40p3xd3ea",
    },
    secondary: {
      name: "Luna",
      denom: Denom.luna,
    },
    lp: {
      name: "Luna LP",
      symbol: "LP",
      address: "terra1ej3q4vnlval579ek2asu69f2uc879tjc4mzm9m",
    },
    pairAddress: "terra120cvhjlrrthszdh8hyang22h5dxsppfz5xp5ft",
  },
  {
    identifier: LLISymbol.lvn,
    primary: levanaTokenAsset,
    secondary: {
      name: "USD",
      denom: Denom.usd,
    },
    lp: {
      name: "LVN LP",
      symbol: "LP",
      address: "terra14lh0qjyk2yvf92scs3gzsgqpz5w5zsvm0ymkfe",
    },
    pairAddress: "terra1gefv0wdufj6tsne8x3jdzqh2rn0rcn0fqnv9ys",
  },
]
