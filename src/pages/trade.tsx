import Box from "@mui/material/Box"
import { NextPage, GetStaticProps } from "next/types"
import { useTheme } from "@mui/material/styles"

import { defaultStaticProps } from "../utils/defaultStaticProps"
import PerpsContainer, {
  margin as perpsContainerMargin,
} from "../components/Perps/PerpsContainer"
import TradeChart from "../components/Trade/TradeChart"
import TradePositionTable from "../components/Trade/TradePositionTable"
import TradeAssetStats from "../components/Trade/TradeAssetStats"
import TradePositionForm from "../components/Trade/TradePositionForm"

const rightWidth = 330

const Trade: NextPage = () => {
  const theme = useTheme()
  const marginPixels = theme.spacing(perpsContainerMargin)

  return (
    <PerpsContainer>
      <Box
        sx={{
          width: `calc(100% - ${rightWidth}px - ${marginPixels})`,
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
          rowGap: perpsContainerMargin,
          my: 2,
        }}
      >
        <TradeAssetStats />
        <TradeChart />
        <TradePositionTable />
      </Box>
      <Box
        sx={{
          width: rightWidth,
          bgcolor: ({ palette }) => palette.background.paper,
          minHeight: "100vh",
        }}
      >
        <TradePositionForm />
      </Box>
    </PerpsContainer>
  )
}

export const getStaticProps: GetStaticProps = defaultStaticProps

export default Trade
