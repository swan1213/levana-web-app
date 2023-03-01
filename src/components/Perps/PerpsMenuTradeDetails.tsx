import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import InfoIcon from "@mui/icons-material/Info"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import TerraIcon from "../../icons/Terra"

import { useTranslations } from "../../utils/useTranslations"
import useTheme from "../../theme/useTheme"

const PerpsMenuTradeDetails = (): JSX.Element => {
  const t = useTranslations("perps.trade.leftSidebar")
  const theme = useTheme()

  const lunaInUst = "89.12"

  return (
    <>
      <Stack direction="row" sx={{ flexWrap: "wrap" }}>
        <TerraIcon fontSize="small" />

        <Typography variant="body2" sx={{ ml: 1, mr: 1 }}>
          LUNA
        </Typography>

        <Typography
          variant="body2"
          color={theme.palette.text.secondary}
          sx={{ marginLeft: "auto" }}
        >
          {lunaInUst} UST
        </Typography>
      </Stack>

      <Grid sx={{ mt: 2 }} alignItems="baseline" container>
        <Grid item xs={1}>
          <IconButton color="primary" size="small" sx={{ padding: 0 }}>
            <InfoIcon sx={{ fontSize: "16px" }} />
          </IconButton>
        </Grid>

        <Grid item xs={11}>
          <Typography
            variant="body2"
            color={theme.palette.text.secondary}
            sx={{ fontSize: "12px" }}
          >
            {t("additionalAssets")}
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default PerpsMenuTradeDetails
