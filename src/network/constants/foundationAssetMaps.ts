import {
  levanaTokenAsset,
  foundationAssetGroups,
  FoundationAsset,
  FoundationTokenAsset,
  FoundationCoinAsset,
  Denom,
} from "./foundation"

const addressesMap: Record<string, FoundationTokenAsset> = {}
const symbolsMap: Record<string, FoundationTokenAsset> = {}
const denomsMap: Record<string, FoundationCoinAsset> = {}

const updateMap = (item: FoundationTokenAsset | FoundationAsset) => {
  if ("address" in item) {
    addressesMap[item.address] = item
    symbolsMap[item.symbol] = item
  }
}

for (const group of foundationAssetGroups) {
  const items = [group.primary, group.secondary, group.lp]

  for (const item of items) {
    updateMap(item)

    if ("denom" in item) {
      denomsMap[item.denom] = item
    }
  }
}

updateMap(levanaTokenAsset)

for (const denom of Object.values(Denom)) {
  if (!denomsMap[denom]) {
    const upper = denom.toUpperCase()

    if (upper.charAt(0) === "U") {
      denomsMap[denom] = { denom, name: upper.substring(1) }
    } else {
      denomsMap[denom] = { denom, name: upper }
    }
  }
}

export { addressesMap, symbolsMap, denomsMap }
