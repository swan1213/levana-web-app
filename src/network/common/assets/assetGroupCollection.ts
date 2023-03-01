import Asset from "./asset"
import AssetGroup from "./assetGroup"
import { LLISymbol } from "../../constants/foundation"
import { NetworkError, NetworkErrorKey } from "../../errors/networkError"

export default class AssetGroupCollection {
  readonly assetGroups: AssetGroup[]
  private assetGroupsMap: Record<string, AssetGroup>
  readonly primaryAssets: Asset[]
  readonly secondaryAssets: Asset[]
  readonly lpAssets: Asset[]

  constructor(assetGroups: AssetGroup[]) {
    this.assetGroups = assetGroups
    this.assetGroupsMap = this.createSymbolsMap(assetGroups)

    const lists = this.createLists(assetGroups)
    this.primaryAssets = lists.primaryAssets
    this.secondaryAssets = lists.secondaryAssets
    this.lpAssets = lists.lpAssets
  }

  private createSymbolsMap(assetGroups: AssetGroup[]) {
    return assetGroups.reduce((accumulator, assetGroup) => {
      accumulator[assetGroup.identifier] = assetGroup
      return accumulator
    }, {} as Record<LLISymbol, AssetGroup>)
  }

  private createLists(assetGroups: AssetGroup[]) {
    const primaryAssets: Asset[] = []
    const secondaryAssets: Asset[] = []
    const lpAssets: Asset[] = []

    for (const assetGroup of assetGroups) {
      primaryAssets.push(assetGroup.primaryAsset)
      secondaryAssets.push(assetGroup.secondaryAsset)
      lpAssets.push(assetGroup.lpAsset)
    }

    return { primaryAssets, secondaryAssets, lpAssets }
  }

  getGroup(index: number): AssetGroup
  getGroup(identifier: LLISymbol | string): AssetGroup
  getGroup(assets: Asset[] | string[]): AssetGroup | undefined
  getGroup(arg: Asset[] | string[] | number | LLISymbol | string) {
    if (Array.isArray(arg)) {
      return this.assetGroups.find((assetGroup) => assetGroup.isMatch(arg))
    } else if (typeof arg === "number") {
      if (this.assetGroups.length > arg) {
        return this.assetGroups[arg]
      } else {
        throw new NetworkError(NetworkErrorKey.internal)
      }
    } else {
      return this.assetGroupsMap[arg]
    }
  }

  getIndex(assetGroup: AssetGroup): number {
    return this.assetGroups.findIndex(
      (group) => assetGroup.identifier === group.identifier
    )
  }
}
