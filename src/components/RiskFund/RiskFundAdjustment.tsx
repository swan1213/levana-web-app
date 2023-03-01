import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"

import RiskFundForm from "./RiskFundForm"
import RiskFundBalance from "./RiskFundBalance"

export default function RiskFundAdjustment() {
  return (
    <Box
      sx={{
        borderRadius: ({ spacing }) => spacing(1),
        bgcolor: ({ palette }) => palette.background.paper,
      }}
    >
      <Grid container>
        <Grid item xs={5} sx={{}}>
          <Stack direction="row" sx={{ pl: 2, py: 2, height: "100%" }}>
            <Box sx={{ flexGrow: 1 }}>
              <RiskFundBalance />
            </Box>
            <Divider orientation="vertical" flexItem sx={{ ml: 2 }} />
          </Stack>
        </Grid>
        <Grid item xs={7}>
          <RiskFundForm />
        </Grid>
      </Grid>
    </Box>
  )
}
