import ButtonBase from "@mui/material/ButtonBase"

import { useConnect } from "../Connect/useConnect"

export default function AssetInputConnect() {
  const { present } = useConnect()

  return (
    <ButtonBase
      disableRipple
      disableTouchRipple
      sx={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}
      onClick={present}
    />
  )
}
