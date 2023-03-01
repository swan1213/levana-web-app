import { useConnectedWallet } from "@terra-money/wallet-provider"

import Box, { BoxProps } from "@mui/material/Box"
import Button from "@mui/material/Button"
import { useConnect } from "../Connect/useConnect"
import LogoutIcon from "@mui/icons-material/Logout"
import { useTranslations } from "../../utils/useTranslations"
import getCompactHash from "../../utils/getCompactHash"
import { adjustedPrimaryMain } from "../../theme/colors"
import useTheme from "../../theme/useTheme"

type PerpsConnectButtonProps = {
  baseZIndex: number
} & BoxProps

const PerpsConnectButton = ({
  sx,
  baseZIndex,
}: PerpsConnectButtonProps): JSX.Element | null => {
  const wallet = useConnectedWallet()
  const { current } = useConnect()
  const theme = useTheme()
  const t = useTranslations("perps.trade.leftSidebar")

  if (current) {
    if (wallet) {
      return (
        <>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              width: "75%",
              position: "absolute",
              zIndex: baseZIndex + 2,
              height: "37px",
            }}
            onClick={current.onClick}
          >
            {getCompactHash(wallet.walletAddress, 8)}
          </Button>

          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              width: "18%",
              minWidth: "unset",
              height: "37px",
              backgroundColor: adjustedPrimaryMain(theme),
              zIndex: baseZIndex + 1,
              float: "right",
              ...sx,
            }}
            onClick={current.onClick}
          >
            <LogoutIcon />
          </Button>

          <Box sx={{ clear: "both" }}></Box>
        </>
      )
    } else {
      return (
        <Button
          variant="contained"
          sx={{ zIndex: baseZIndex + 1, ...sx }}
          onClick={current.onClick}
          fullWidth
        >
          {t("connect")}
        </Button>
      )
    }
  } else {
    return null
  }
}

export default PerpsConnectButton
