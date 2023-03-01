import { atom } from "recoil"

export const walletAddressState = atom<string | undefined>({
  key: "walletAddress",
  default: undefined,
})
