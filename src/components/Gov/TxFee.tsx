import { Tooltip } from "@mui/material"
import { InfoOutlined } from "@mui/icons-material"
import { useTranslations as useNextTranslations } from "next-intl"

// import { useTranslations } from "../../../utils/useTranslations"

type Props = {
  id: string
  txFee: string
  currency: string
}

const TxFeeContainer = {
  background: "black",
  marginRight: -2,
  marginTop: 8,
  marginLeft: 1,
  height: 100,
  display: "flex",
  justifyContent: "space-between",
  padding: 10,
  borderRadius: 7,
}

export default function TxFee(props: Props) {
  const { id, txFee, currency } = props
  // const t = useTranslations()
  const t = useNextTranslations() // TODO: replace with above function

  return (
    <div style={TxFeeContainer}>
      <Tooltip title={t(id)}>
        <p>
          {t("gov.poll.submit.fee")}
          <InfoOutlined />
        </p>
      </Tooltip>
      <p>
        {txFee} {currency}
      </p>
    </div>
  )
}
