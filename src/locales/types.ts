export type Language = "en" //| "ko"

export interface LocaleStrings extends Record<string, string> {
  direction: "ltr" | "rtl"

  // General
  copyright: string

  // Dashboard
  "dashboard.header.title": string
  "dashboard.header.subtitle": string
  "dashboard.header.description": string

  // Swap
  "swap.title": string
  "swap.from": string
  "swap.to": string

  // Timeline
  "timeline.d1": string
  "timeline.w1": string
  "timeline.m1": string
  "timeline.y1": string

  // Track
  "track.title": string
}

export interface LocaleStrings2 {
  layout: {
    direction: string
  }
  generic: {
    copyright: string
    loading: string
  }
}
