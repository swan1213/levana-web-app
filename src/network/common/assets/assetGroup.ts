import Asset from "./asset"
import { FoundationAssetGroup } from "../../constants/foundation"

export enum AssetGroupType {
  primary,
  secondary,
  lp,
}

export default class AssetGroup {
  readonly tokenContractGroup: FoundationAssetGroup
  private _primaryAsset: Asset
  private _secondaryAsset: Asset
  private _lpAsset: Asset

  constructor(tokenContractGroup: FoundationAssetGroup) {
    this.tokenContractGroup = tokenContractGroup
    this._primaryAsset = new Asset(tokenContractGroup.primary)
    this._secondaryAsset = new Asset(tokenContractGroup.secondary)
    this._lpAsset = new Asset(tokenContractGroup.lp)
  }

  get identifier() {
    return this.tokenContractGroup.identifier
  }

  get primaryAsset() {
    return this._primaryAsset
  }

  get secondaryAsset() {
    return this._secondaryAsset
  }

  get lpAsset() {
    return this._lpAsset
  }

  get pairAddress() {
    return this.tokenContractGroup.pairAddress
  }

  get assetIds() {
    return [this._primaryAsset.id, this._secondaryAsset.id, this._lpAsset.id]
  }

  isMatch(assets: Asset[] | string[]) {
    if (assets.length === 0) {
      return false
    }

    const assetIds = assets.map((asset) =>
      asset instanceof Asset ? asset.id : asset
    )
    const filteredIds = assetIds.filter((assetId) =>
      this.assetIds.includes(assetId)
    )

    return filteredIds.length === assets.length
  }

  asset(type: AssetGroupType) {
    switch (type) {
      case AssetGroupType.primary:
        return this._primaryAsset
      case AssetGroupType.secondary:
        return this._secondaryAsset
      case AssetGroupType.lp:
        return this._lpAsset
    }
  }
}
