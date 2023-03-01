import { atom } from "recoil"

import AssetGroup from "../network/common/assets/assetGroup"
import { assetCollection } from "../network/constants/assetCollection"
import { LLISymbol } from "../network/constants/foundation"

export const assetGroupState = atom<AssetGroup>({
  key: "assetGroup",
  default: assetCollection.getGroup(LLISymbol.luna2x),
})
