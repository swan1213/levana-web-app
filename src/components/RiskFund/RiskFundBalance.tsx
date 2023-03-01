import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import StatLabel from "../common/StatLabel"
import { useTranslations } from "../../utils/useTranslations"

export default function RiskFundBalance() {
  const t = useTranslations("perps.riskFund.balance")

  return (
    <Stack
      direction="column"
      sx={{ height: "100%", justifyContent: "space-between" }}
    >
      <StatLabel title="Risk Fund Balance" value="0.2 LVN" valueSize="xlarge" />
      <Typography variant="body2" color="text.secondary">
        {t("details")}
      </Typography>
    </Stack>
  )
}
