import ButtonBase from "@mui/material/ButtonBase"
import Stack from "@mui/material/Stack"

export interface AssetInputVStackProps {
  Primary?: JSX.Element
  Secondary?: JSX.Element
  onClick?: () => void
}

export default function AssetInputVStack(props: AssetInputVStackProps) {
  const { Primary, Secondary, onClick } = props
  const justifyContent = Primary && Secondary ? "space-between" : "center"

  return (
    <Stack
      direction="column-reverse"
      justifyContent={justifyContent}
      position="relative"
    >
      {Primary}
      {Secondary}
      {onClick && (
        <ButtonBase
          disableRipple
          onClick={onClick}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: "100%",
            height: "100%",
          }}
        />
      )}
    </Stack>
  )
}
