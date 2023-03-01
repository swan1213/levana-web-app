import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import { useTranslations } from "../../utils/useTranslations"

export default function RiskFundHeader() {
  const t = useTranslations()
  return (
    <Box px={2}>
      <Typography variant="subtitle1">Stake LVN, Earn Yield</Typography>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus nisi,
        viverra amet diam aenean.
      </Typography>
    </Box>
  )
}
