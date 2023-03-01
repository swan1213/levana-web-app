import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"

import Chart from "../../common/Chart/Chart"
import { useExchangeContext } from "../ExchangeContext"
import ExchangeChartPrice from "./ExchangeChartPrice"
import ExchangeChartTimeline from "./ExchangeChartTimeline"
import BackgroundSkeleton from "../../common/BackgroundSkeleton"

export default function ExchangeChart() {
  const { priceIndex } = useExchangeContext()
  const { assetId, initializing, chartData, error } = priceIndex

  return (
    <Box
      sx={{
        height: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {initializing ? (
        <Stack
          direction="column"
          width="100%"
          alignSelf="flex-start"
          spacing={2}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
          >
            <BackgroundSkeleton
              variant="rectangular"
              width="50%"
              height="60px"
            />
            <BackgroundSkeleton
              variant="rectangular"
              width="160px"
              height="60px"
            />
          </Stack>
          <BackgroundSkeleton
            variant="rectangular"
            width="100%"
            height="200px"
          />
        </Stack>
      ) : chartData ? (
        <Stack direction="column" sx={{ height: "100%", width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ExchangeChartPrice />
            <Box sx={{ flexGrow: 1, minWidth: 20 }} />
            <ExchangeChartTimeline />
          </Box>
          <Chart assetId={assetId} items={chartData.items} />
        </Stack>
      ) : (
        error && <>Error</>
      )}
    </Box>
  )
}
