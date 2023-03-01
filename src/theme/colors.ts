import { decomposeColor, recomposeColor, Theme } from "@mui/material/styles"

export function lightness(hslColor: string, adjustment: number) {
  const color = decomposeColor(hslColor)
  const [, , l] = color.values
  color.values[2] = Math.min(100, Math.max(0, l + adjustment))
  return recomposeColor(color)
}

export function adjustThemeColor(
  theme: Theme,
  hslColor: string,
  lightAdjustment: number,
  darkAdjustment: number
) {
  return lightness(
    hslColor,
    theme.palette.mode === "dark" ? darkAdjustment : lightAdjustment
  )
}

export function adjustedPrimaryMain(theme: Theme) {
  return adjustThemeColor(theme, theme.palette.primary.main, 20, -10)
}
