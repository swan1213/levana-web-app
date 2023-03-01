import { atom } from "recoil"

import { persistAtomEffect } from "../utils/persistAtomEffect"

export enum PaletteMode {
  auto,
  light,
  dark,
}

export const paletteModeState = atom<PaletteMode>({
  key: "paletteMode",
  default: PaletteMode.auto,
  effects_UNSTABLE: [persistAtomEffect],
})
