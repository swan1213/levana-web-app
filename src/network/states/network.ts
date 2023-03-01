import { atom } from "recoil"

import { defaultNetwork } from "../constants/networks"
import { NetworkInfo } from "../constants/networks"

export const networkState = atom<NetworkInfo>({
  key: "network",
  default: { name: "", chainID: "", lcd: "", ...defaultNetwork },
})
