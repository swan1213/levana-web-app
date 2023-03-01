import { atom } from "recoil"

import { TimelineUnit } from "./types"

export const timelineState = atom<TimelineUnit>({
  key: "timeline",
  default: "w1",
})
