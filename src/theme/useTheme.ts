import { createTheme } from "@mui/material/styles"
import { TypeBackground } from "@mui/material/styles/createPalette"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useMemo } from "react"
import { useRecoilValue } from "recoil"

import { paletteModeState, PaletteMode } from "../theme/paletteModeState"

interface PaletteGradient {
  start: string
  end: string
}

interface Gradients {
  background: PaletteGradient
}

declare module "@mui/material/styles" {
  interface Theme {
    gradient: Gradients
  }

  interface ThemeOptions {
    gradient: Gradients
  }
}

export default function useTheme() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  const paletteMode = useRecoilValue(paletteModeState)

  const isDark: boolean = (() => {
    switch (paletteMode) {
      case PaletteMode.auto:
        return prefersDarkMode
      case PaletteMode.light:
        return false
      case PaletteMode.dark:
        return true
    }
  })()

  return useMemo(() => {
    const background: TypeBackground = {
      default: isDark ? "#190624" : "#f8f7fc",
      paper: isDark ? "hsl(279, 100%, 13%)" : "hsl(251, 50%, 94%)",
    }

    const theme = createTheme({
      palette: {
        background,
        primary: {
          main: isDark ? "hsl(319, 76%, 28%)" : "hsl(248, 51%, 54%)",
        },
        mode: isDark ? "dark" : "light",
      },
      gradient: {
        background: {
          start: isDark ? "#190624" : "#f8f7fc",
          end: background.paper,
        },
      },
      typography: {
        h1: {
          fontSize: "2.2rem",
        },
        subtitle1: {
          fontSize: "1.4rem",
          fontWeight: 600,
        },
        subtitle2: {
          fontSize: "1.2rem",
          fontWeight: 600,
        },
      },
    })

    return createTheme({
      ...theme,
      components: {
        MuiButton: {
          styleOverrides: {
            containedPrimary: {
              "&.Mui-disabled": (() => {
                const background = theme.palette.primary.main

                return {
                  background,
                  color: theme.palette.getContrastText(background),
                  opacity: 0.5,
                }
              })(),
            },
          },
        },

        MuiSelect: {
          styleOverrides: {
            select: {
              backgroundColor: "transparent",
            },
          },
        },

        MuiToggleButtonGroup: {
          styleOverrides: {
            grouped: {
              minWidth: 36,
              border: 0,
              color: theme.palette.text.primary,
              "&.Mui-selected": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                },
              },
              "&.Mui-disabled": {
                border: 0,
              },
              "&:not(:first-of-type)": {
                borderRadius: theme.shape.borderRadius,
                marginLeft: theme.spacing(0.5),
                border: 0,
              },
              "&:first-of-type": {
                borderRadius: theme.shape.borderRadius,
                marginLeft: 0,
              },
            },
          },
        },
      },
    })
  }, [isDark])
}
