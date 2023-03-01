import { useMemo } from "react"

import { useTranslations } from "../../utils/useTranslations"

export interface HeaderPage {
  title: string
  path: string
}

export function useHeaderPages() {
  const t = useTranslations()

  const exchange = useMemo<HeaderPage>(
    () => ({
      title: t("header.exchange.title"),
      path: "/",
    }),
    [t]
  )

  const pages = useMemo<HeaderPage[]>(
    () => [
      exchange,
      {
        title: t("header.farm.title"),
        path: "/farm",
      },
      {
        title: t("header.trade.title"),
        path: "/trade",
      },
    ],
    [t, exchange]
  )

  return { home: exchange, pages }
}
