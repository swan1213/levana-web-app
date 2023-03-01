import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import { NextPage, GetStaticProps } from "next/types"

import { defaultStaticProps } from "../utils/defaultStaticProps"
import PerpsContainer, {
  margin as perpsContainerMargin,
} from "../components/Perps/PerpsContainer"
import RiskFundAdjustment from "../components/RiskFund/RiskFundAdjustment"
import RiskFundHeader from "../components/RiskFund/RiskFundHeader"
import RiskFundStats from "../components/RiskFund/RiskFundStats"

const RiskFund: NextPage = () => {
  return (
    <PerpsContainer>
      <Grid
        container
        spacing={perpsContainerMargin}
        alignItems="start"
        sx={{ mt: 0, mr: perpsContainerMargin }}
      >
        <Grid item xs={12}>
          <RiskFundHeader />
        </Grid>
        <Grid item xs={12} lg={5}>
          <Box>
            <RiskFundStats />
          </Box>
        </Grid>
        <Grid item xs={12} lg={7}>
          <RiskFundAdjustment />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ bgcolor: "gray", height: 100 }}>risk fund breakdown</Box>
        </Grid>
      </Grid>
    </PerpsContainer>
  )
}

export const getStaticProps: GetStaticProps = defaultStaticProps

export default RiskFund
