import InputBase from "@mui/material/InputBase"
import Amount from "../../network/common/amount"

import {
  AssetInputActiveProps,
  AssetInputSubProps,
  AssetInputAmountState,
} from "./types"

interface AssetInputFieldProps
  extends AssetInputActiveProps,
    AssetInputSubProps,
    AssetInputAmountState {
  color?: "text.primary" | "text.disabled"
}

export default function AssetInputField(props: AssetInputFieldProps) {
  const { amount, setAmount, padding, readOnly, onActive } = props
  const color = props.color ?? "text.primary"

  const changeAmount: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const match = event.target.value.match(/^\d*\.?\d{0,6}$/)

    if (match && setAmount) {
      if (onActive) {
        onActive()
      }

      setAmount(new Amount(event.target.value, true))
    }
  }

  return (
    <InputBase
      onChange={changeAmount}
      value={amount?.initial ?? ""}
      inputProps={{ style: { textAlign: "right" } }}
      placeholder="0.0"
      readOnly={readOnly}
      sx={{
        color,
        flexGrow: 1,
        paddingRight: padding,
        fontSize: "1.2em",
        fontWeight: "bold",
        pointerEvents: readOnly ? "none" : "auto",
      }}
    />
  )
}
