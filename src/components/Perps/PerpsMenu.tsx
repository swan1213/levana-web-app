import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import { FaTwitter, FaGithub, FaDiscord, FaTelegramPlane } from "react-icons/fa"

import PerpsConnectButton from "./PerpsConnectButton"
import PerpsRollers from "./PerpsRollers"
import PerpsSocialIcon from "./PerpsSocialIcon"
import ThemePicker from "../common/ThemePicker"
import StatLabel from "../common/StatLabel"
import PerpsVault from "./Vault/PerpsVault"
import { useTranslations } from "../../utils/useTranslations"
import useTheme from "../../theme/useTheme"

export default function PerpsMenu() {
  const t = useTranslations("perps.trade.leftSidebar")
  const theme = useTheme()

  const accountValue = "0.00"
  const accumulativeFundingPayments = "0.00"
  const netValueOfOpenPosition = "0.00"
  const numberOfPositionsInLiquidityRisk = "0.00"

  const spacing = 3

  const baseZIndex = theme.zIndex.drawer

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        px: 2,
        pb: 2,
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          mx: -2,
          mb: spacing,
          pt: 2,
          px: 2,

          zIndex: baseZIndex,
          bgcolor: ({ palette }) => palette.background.paper,
        }}
      >
        <PerpsConnectButton baseZIndex={baseZIndex} />
        <Divider sx={{ pt: spacing, px: spacing, width: "100%" }} />
      </Box>

      <Box sx={{ mb: spacing }}>
        <PerpsVault />
      </Box>

      <Divider sx={{ mb: spacing }} />
      <Box>
        <Box sx={{ mb: spacing }}>
          <StatLabel
            direction={"column"}
            title={t("overallAccountValue")}
            titleSize="small"
            value={`${accountValue} UST`}
          />
        </Box>

        <Box sx={{ mb: spacing }}>
          <StatLabel
            direction={"column"}
            title={t("accumulativeFundingPayments")}
            titleSize="small"
            value={`${accumulativeFundingPayments} UST`}
          />
        </Box>

        <Box sx={{ mb: spacing }}>
          <StatLabel
            direction={"column"}
            title={t("netValueOfOpenPosition")}
            titleSize="small"
            value={`${netValueOfOpenPosition} UST`}
          />
        </Box>

        <Box sx={{ mb: spacing }}>
          <StatLabel
            direction={"column"}
            title={t("numberOfPositionsInLiquidityRisk")}
            titleSize="small"
            value={`${numberOfPositionsInLiquidityRisk} UST`}
          />
        </Box>
      </Box>

      <Divider sx={{ mb: spacing }} />

      <PerpsRollers spacing={spacing} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "flex-end",
          rowGap: spacing,
        }}
      >
        <ThemePicker
          sx={{
            alignSelf: "center",
          }}
        />

        <Box>
          <Divider sx={{ mb: spacing, flexGrow: "1" }} />

          <Grid container>
            <Grid xs={3} sx={{ textAlign: "center" }} item>
              <PerpsSocialIcon
                icon={<FaTwitter />}
                link="https://twitter.com/..."
              />
            </Grid>

            <Grid xs={3} sx={{ textAlign: "center" }} item>
              <PerpsSocialIcon
                icon={<FaGithub />}
                link="https://github.com/..."
              />
            </Grid>

            <Grid xs={3} sx={{ textAlign: "center" }} item>
              <PerpsSocialIcon
                icon={<FaDiscord />}
                link="https://discord.com/...."
              />
            </Grid>

            <Grid xs={3} sx={{ textAlign: "center" }} item>
              <PerpsSocialIcon
                icon={<FaTelegramPlane />}
                link="https://telegram.com/..."
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}
