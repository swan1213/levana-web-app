import { useState } from "react"

import { useRouter } from "next/router"
import { PerpsRoute } from "../../routes/perps"
import PerpsRollerBlind, { PerpsRollerBlindProps } from "./PerpsRollerBlind"
import PerpsMenuTradeDetails from "./PerpsMenuTradeDetails"
import { useTranslations } from "../../utils/useTranslations"

enum Roller {
  trade,
  riskFund,
  history,
}

const rollerToPath = (roller: Roller): string => {
  switch (roller) {
    case Roller.trade:
      return "trade"
    case Roller.riskFund:
      return "risk-fund"
    case Roller.history:
      return "history"
  }
}

const pathToRoller = (pathname: string): Roller | undefined => {
  switch (pathname) {
    case `/${PerpsRoute.trade}`:
      return Roller.trade
    case `/${PerpsRoute.riskFund}`:
      return Roller.riskFund
    case `/${PerpsRoute.history}`:
      return Roller.history
    default:
      return undefined
  }
}

type PerpsRollersProps = {
  spacing: number
}

const PerpsRollers = ({ spacing }: PerpsRollersProps): JSX.Element => {
  const router = useRouter()
  const [expandedRoller, setExpandedRoller] = useState<Roller | undefined>(
    pathToRoller(router.pathname)
  )
  const t = useTranslations("perps.trade.leftSidebar")

  const expandAndNavigateTo = (roller: Roller): (() => void) => {
    return () => {
      setExpandedRoller(roller)
      router.push(rollerToPath(roller))
    }
  }

  const retract = () => {
    setExpandedRoller(undefined)
  }

  const rollerTitle = (roller: Roller): string => {
    switch (roller) {
      case Roller.trade:
        return t("trade")
      case Roller.riskFund:
        return t("riskFund")
      case Roller.history:
        return t("history")
    }
  }

  const propsForRoller = (roller: Roller): PerpsRollerBlindProps => {
    const isExpanded = expandedRoller === roller

    return {
      title: rollerTitle(roller),
      isExpanded: isExpanded,
      onClick: isExpanded ? retract : expandAndNavigateTo(roller),
    }
  }

  return (
    <>
      <PerpsRollerBlind {...propsForRoller(Roller.trade)}>
        <PerpsMenuTradeDetails />
      </PerpsRollerBlind>

      <PerpsRollerBlind {...propsForRoller(Roller.riskFund)} />

      <PerpsRollerBlind
        {...{
          ...propsForRoller(Roller.history),
          sx: {
            "&:last-of-type": { borderRadius: 4 },
            "&.Mui-expanded:last-of-type": { mb: spacing },
          },
        }}
      />
    </>
  )
}

export default PerpsRollers
