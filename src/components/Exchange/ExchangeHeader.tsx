import Box, { BoxProps } from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useRecoilValue } from "recoil"

import { assetGroupState } from "../../data/assetGroupState"
import ExchangeStats from "./Stats/ExchangeStats"

export default function ExchangeHeader(props: BoxProps) {
  const assetGroup = useRecoilValue(assetGroupState)

  return (
    <Box {...props}>
      <Typography variant="subtitle1">
        {assetGroup.primaryAsset.name}
      </Typography>
      <ExchangeStats />
    </Box>
  )
}
