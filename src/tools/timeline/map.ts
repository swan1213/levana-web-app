import { TimelineUnit, TimelinePriceIndexProps } from "./types"

export const timelineMap = (unit: TimelineUnit): TimelinePriceIndexProps => {
  switch (unit) {
    case "d1":
      return { timeline: 1, frequency: 1 }
    case "w1":
      return { timeline: 7, frequency: 1 }
    case "m1":
      return { timeline: 30, frequency: 2 }
    case "y1":
      return { timeline: 365, frequency: 12 }
  }
}
