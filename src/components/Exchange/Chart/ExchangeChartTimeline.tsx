import CircularProgress from "@mui/material/CircularProgress"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { useRecoilState } from "recoil"

import { TimelineUnit } from "../../../tools/timeline/types"
import { timelineUnits } from "../../../tools/timeline/timeline"
import { timelineState } from "../../../tools/timeline/state"
import { useTranslations } from "../../../utils/useTranslations"
import { useExchangeContext } from "../ExchangeContext"

export default function ExchangeChartTimeline() {
  const [timeline, setTimeline] = useRecoilState(timelineState)
  const { priceIndex } = useExchangeContext()
  const { loading } = priceIndex
  const t = useTranslations()

  const handleTimeline = (
    event: React.MouseEvent<HTMLElement>,
    timeline: TimelineUnit | null
  ) => timeline !== null && setTimeline(timeline)

  return (
    <ToggleButtonGroup
      size="small"
      value={timeline}
      exclusive
      onChange={handleTimeline}
      disabled={loading}
    >
      {timelineUnits.map((unit) => (
        <ToggleButton key={unit} value={unit}>
          {loading && unit === timeline ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <>{t(`timeline.${unit}`)}</>
          )}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
