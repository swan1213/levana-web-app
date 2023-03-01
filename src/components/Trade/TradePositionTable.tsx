import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Stack from "@mui/material/Stack"

import { Asset, Amount } from "../../network"
import { useTranslations } from "../../utils/useTranslations"
import { PositionType } from "./tradeTypes"
import { useConnectedWallet } from "@terra-money/wallet-provider"

function createData(
  opened: string,
  valueAsset: Asset,
  type: PositionType,
  entryAmount: Amount,
  marginRatio: number,
  paymentAsset: Asset
) {
  return { opened, valueAsset, type, entryAmount, marginRatio, paymentAsset }
}

const valueAsset = new Asset("uusd", 1000010000)
const paymentsAsset = new Asset("uusd", 1000000400)
const entryAmount = new Amount(90003000)

function getDate(timestamp: number) {
  return new Date(timestamp).toLocaleString()
}

const rows = [
  createData(
    getDate(1646730152000),
    valueAsset,
    "long",
    entryAmount,
    20,
    paymentsAsset
  ),
  createData(
    getDate(1646730252000),
    valueAsset,
    "long",
    entryAmount,
    25,
    paymentsAsset
  ),
  createData(
    getDate(1646730352000),
    valueAsset,
    "long",
    entryAmount,
    30,
    paymentsAsset
  ),
  createData(
    getDate(1646730452000),
    valueAsset,
    "long",
    entryAmount,
    35,
    paymentsAsset
  ),
]

export default function TradePositionTable() {
  const connectedWallet = useConnectedWallet()
  const t = useTranslations("perps.trade.table")

  const localizedType = (type: PositionType) => t(type)

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
        borderRadius: ({ spacing }) => spacing(1),
        bgcolor: ({ palette }) => palette.background.paper,
      }}
    >
      {connectedWallet ? (
        <TableContainer>
          <Table sx={{ whiteSpace: "nowrap" }}>
            <TableHead>
              <TableRow>
                <TableCell align="left">Opened at</TableCell>
                <TableCell align="left">Position size</TableCell>
                <TableCell align="left">Initial Leverage</TableCell>
                <TableCell align="left">Long/Short</TableCell>
                <TableCell align="left">Price Opened</TableCell>
                <TableCell align="left">Price closed</TableCell>
                <TableCell align="left">Accumulative Funding</TableCell>
                <TableCell align="left">Closed ar</TableCell>
                <TableCell align="left">Realized PnL</TableCell>
                <TableCell align="left">Fees</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" component="th" scope="row">
                    {row.opened}
                  </TableCell>
                  <TableCell align="left">
                    {row.valueAsset.toFormattedAmount()}
                  </TableCell>
                  <TableCell align="left">{localizedType(row.type)}</TableCell>
                  <TableCell align="left">
                    {row.entryAmount.toDecimal(true)}
                  </TableCell>
                  <TableCell align="left">{`${row.marginRatio}%`}</TableCell>
                  <TableCell align="left">
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Box>{row.paymentAsset.toFormattedAmount()}</Box>
                      <Button variant="contained" size="small">
                        {t("closeButton.title")}
                      </Button>
                      <Button variant="outlined" size="small">
                        {t("addButton.title")}
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box
          sx={{
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {t("connect")}
        </Box>
      )}
    </Box>
  )
}
