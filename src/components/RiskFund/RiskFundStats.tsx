import { useTranslations } from "../../utils/useTranslations"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"

export default function RiskFundStats() {
  const t = useTranslations()
  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: ({ palette }) => palette.background.paper,
        borderRadius: ({ spacing }) => spacing(1),
        py: 2,
      }}
    >
      <Grid container textAlign="center">
        <Grid item md={6} borderRight="1px solid rgba(255, 255, 255, .2)">
          <Typography
            variant="h1"
            style={{ textShadow: "0px 0px 30px rgba(192, 23, 123, 0.9)" }}
          >
            12.3%
          </Typography>
          <Typography fontSize="body1" color="secondary">
            APY 7 days
          </Typography>
          <Box display="flex" ml="15%" mt="25px">
            <Typography variant="body2" color="primary" pr={1}>
              *
            </Typography>
            <Typography
              fontSize="10px"
              lineHeight="15px"
              color="text.secondary"
              textAlign="left"
            >
              Risk Fund Primary
              <br /> Tranche - UST Tranche
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            mt={2}
            ml={2}
            pr={2}
            pt={3}
            borderTop="1px solid rgba(255, 255, 255, .2)"
          >
            <Typography variant="caption" color="text.primary">
              1,000,000 UST
            </Typography>
            <Typography variant="caption" color="primary">
              100% Full
            </Typography>
          </Box>
        </Grid>
        <Grid item md={6}>
          <Typography
            variant="h1"
            style={{ textShadow: "0px 0px 30px rgba(192, 23, 123, 0.9)" }}
          >
            15.3%
          </Typography>
          <Typography variant="body1" color="secondary">
            APY 30 days
          </Typography>
          <Box display="flex" ml="15%" mt="25px">
            <Typography variant="body2" color="primary" pr={1}>
              *
            </Typography>
            <Typography
              fontSize="10px"
              lineHeight="15px"
              color="text.secondary"
              textAlign="left"
            >
              Risk Fund Primary
              <br /> Tranche - LVN Tranche
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            mt={2}
            mr={2}
            pl={2}
            pt={3}
            borderTop="1px solid rgba(255, 255, 255, .2)"
          >
            <Typography variant="body2" color="text.primary">
              1,000,000 UST
            </Typography>
            <Typography variant="body2" color="primary"></Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
