import { HashRouteMap } from "./useHashRoute"
import { AssetGroupProps } from "../types/assets"
import { assetCollection } from "../network/constants/assetCollection"

export enum FarmRoute {
  provide = "provide",
  unstake = "unstake",
}

export interface FarmRouteProps extends AssetGroupProps {
  route: FarmRoute
}

export const farmRouteMap: HashRouteMap<FarmRouteProps> = {
  decode: (...hashComponents) => {
    const [route, assetId] = hashComponents

    if (
      (route !== FarmRoute.provide && route !== FarmRoute.unstake) ||
      assetId === undefined
    ) {
      return
    }

    const assetGroup = assetCollection.getGroup(assetId)

    if (!assetGroup) {
      console.warn("No matching symbol for:", assetId)
      return
    }

    return { route, assetGroup }
  },
  encode: (props) => {
    const { route, assetGroup } = props
    return `${route}/${assetGroup.identifier}`
  },
}
