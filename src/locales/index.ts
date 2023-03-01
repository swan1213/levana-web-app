import { atom } from "recoil"

import { Language, LocaleStrings } from "./types"

// import en from "./en"

export const languageState = atom<Language>({
  key: "language",
  default: "en",
})

// export const locales: Record<Language, LocaleStrings> = {
//   en,
// }
