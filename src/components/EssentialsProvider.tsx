import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { NextIntlProvider } from "next-intl"
import { ComponentProps, PropsWithChildren, useEffect } from "react"
import { IntlProvider } from "use-intl"

import useTheme from "../theme/useTheme"
import { useSsrComplected } from "../utils/persistAtomEffect"

export type EssentialsProviderProps = PropsWithChildren<
  Required<Pick<ComponentProps<typeof IntlProvider>, "messages">>
>

export default function EssentialsProvider(props: EssentialsProviderProps) {
  const { messages, children } = props

  return (
    <NextIntlProvider messages={messages}>
      <StateController />
      <ThemeController>{children}</ThemeController>
    </NextIntlProvider>
  )
}

function StateController() {
  const setSsrCompleted = useSsrComplected()
  useEffect(setSsrCompleted, [setSsrCompleted])

  return <></>
}

function ThemeController(props: PropsWithChildren<unknown>) {
  const { children } = props
  const theme = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
