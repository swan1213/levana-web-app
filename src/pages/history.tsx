import { NextPage, GetStaticProps } from "next/types"

import { defaultStaticProps } from "../utils/defaultStaticProps"
import { useTheme } from "@mui/material/styles"

import PerpsContainer, {
  margin as perpsContainerMargin,
} from "../components/Perps/PerpsContainer"
import TradePositionTable from "../components/Trade/TradePositionTable"
import FundingPaymentTable from "../components/Trade/FundingPayment"
import AvailableBalanceTable from "../components/Trade/AvailableBalance"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

import { adjustedPrimaryMain } from "../theme/colors"
import { useState } from "react"
import { useConnect } from "../components/Connect/useConnect"
import { Toolbar } from "@mui/material"
import { leftWidth } from "../components/Perps/PerpsContainer"

const History: NextPage = () => {
  const theme = useTheme()
  const [selectedHistory, setSelectedHisotry] = useState(0)
  const [showType, setShowType] = useState(0)
  const { current } = useConnect()
  const marginPixels = theme.spacing(perpsContainerMargin)

  const rightWidth = 1000

  return (
    <PerpsContainer>
      {current?.isConnected ? (
        <Box>
          <Box
            sx={{
              borderRadius: ({ spacing }) => spacing(1),
              bgcolor: ({ palette }) => palette.background.paper,
            }}
            my={3}
            p={1}
          >
            <Button
              variant={(selectedHistory == 0 && "contained") || "text"}
              onClick={() => setSelectedHisotry(0)}
              style={{ marginRight: "10px" }}
            >
              TRADING HISTORY
            </Button>
            <Button
              variant={(selectedHistory == 1 && "contained") || "text"}
              onClick={() => setSelectedHisotry(1)}
            >
              STAKING HISTORY
            </Button>
          </Box>
          <Box
            sx={{
              borderRadius: ({ spacing }) => spacing(1),
              bgcolor: ({ palette }) => palette.background.paper,
            }}
            my={3}
            p={1}
          >
            <Button
              variant={(showType == 0 && "contained") || "text"}
              onClick={() => setShowType(0)}
              size="small"
            >
              POSITIONS
            </Button>
            <Button
              variant={(showType == 1 && "contained") || "text"}
              onClick={() => setShowType(1)}
              size="small"
            >
              FUNDING PAYMENTS
            </Button>
            <Button
              variant={(showType == 2 && "contained") || "text"}
              onClick={() => setShowType(2)}
              size="small"
            >
              AVAILABLE BALANCE
            </Button>
          </Box>
          <Box
            sx={{
              borderRadius: ({ spacing }) => spacing(1),
              bgcolor: ({ palette }) => palette.background.paper,
              width: window.innerWidth - leftWidth - 25,
            }}
            my={3}
          >
            {showType == 0 ? (
              <>
                <Toolbar>Orders Section Title</Toolbar>
                <TradePositionTable />
              </>
            ) : showType == 1 ? (
              <>
                <Toolbar>Funding payments</Toolbar>
                <FundingPaymentTable />
              </>
            ) : (
              <>
                <Toolbar>Orders Section Title</Toolbar>
                <AvailableBalanceTable />
              </>
            )}
          </Box>
        </Box>
      ) : (
        "Connect your wallet to see your history"
      )}
    </PerpsContainer>
  )
}

export const getStaticProps: GetStaticProps = defaultStaticProps

export default History
