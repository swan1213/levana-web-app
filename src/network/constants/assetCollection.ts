import AssetGroup from "../common/assets/assetGroup"
import AssetGroupCollection from "../common/assets/assetGroupCollection"
import { foundationAssetGroups } from "./foundation"

export const assetCollection = new AssetGroupCollection(
  foundationAssetGroups.map((group) => new AssetGroup(group))
)
