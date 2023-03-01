// import ListSubheader from "@mui/material/ListSubheader"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { Dispatch, SetStateAction } from "react"

import {
  AssetInputSubProps,
  AssetInputAssets,
  AssetInputIndexState,
} from "./types"

interface AssetInputSelectProps
  extends AssetInputSubProps,
    AssetInputIndexState,
    AssetInputAssets {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function AssetInputSelect(props: AssetInputSelectProps) {
  const { assetIndex, setAssetIndex, assets, padding, open, setOpen } = props
  const readOnly = props.readOnly || assets.length <= 1

  const icon = readOnly ? () => <></> : undefined

  const closeSelect = () => setOpen(false)

  const changeSelect = (event: SelectChangeEvent<number>) => {
    if (setAssetIndex) {
      if (typeof event.target.value === "string") {
        setAssetIndex(parseInt(event.target.value, 10))
      } else {
        setAssetIndex(event.target.value)
      }
    }
  }

  return (
    <Select
      variant="standard"
      disableUnderline
      IconComponent={icon}
      open={open}
      onClose={closeSelect}
      onChange={changeSelect}
      value={assetIndex}
      readOnly={readOnly}
      sx={{
        pl: padding,
        py: padding * 0.2,
        fontSize: "1.2em",
        fontWeight: "bold",
        pointerEvents: readOnly ? "none" : "auto",
      }}
    >
      {/* <ListSubheader>Terra</ListSubheader> */}
      {assets.map(({ name }, index) => (
        <MenuItem key={index} value={index}>
          {name}
        </MenuItem>
      ))}
    </Select>
  )
}
