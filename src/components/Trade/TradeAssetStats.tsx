import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import StatLabel from "../common/StatLabel"
import TerraIcon from "../../icons/Terra"
import { useTranslations } from "../../utils/useTranslations"
import { useVammStats } from "../../network/queries/perps/vamm/useVammStats"

export default function TradeAssetStats() {
  const t = useTranslations("perps.trade.stats")
  const vammStats = useVammStats()

  // TODO: query change and volume

  const markPrice = vammStats.stats
    ? vammStats.stats.markPrice.toDecimal(2)
    : "..."
  const spotPrice = vammStats.stats
    ? vammStats.stats.spotPrice.toDecimal(2)
    : "..."
  const change = "-6.56%"
  const volume = "25.67%"
  const fundingRate = "-0.0127%"

  const stats: { title: string; value: string }[] = [
    { title: t("markPrice"), value: markPrice },
    { title: t("spotPrice"), value: spotPrice },
    { title: t("change"), value: change },
    { title: t("volume"), value: volume },
    { title: t("fundingRate"), value: fundingRate },
  ]

  return (
    <Box
      sx={{
        bgcolor: ({ palette }) => palette.background.paper,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        p: 2,
        borderRadius: ({ spacing }) => spacing(1),
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
          alignItems: "center",
        }}
      >
        <TerraIcon fontSize="large" sx={{ mr: 1 }} />
        <Typography variant="subtitle1">Luna2x</Typography>
      </Box>
      <Box
        sx={{
          ml: 5,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          columnGap: 3,
          rowGap: 1,
        }}
      >
        {stats.map(({ title, value }, index) => (
          <StatLabel
            key={index}
            title={title}
            value={value}
            titleSize="small"
          />
        ))}
      </Box>
    </Box>
  )
}
