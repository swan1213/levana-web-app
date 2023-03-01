import Box, { BoxProps } from "@mui/material/Box"
import { useTheme } from "@mui/material/styles"

export const outlineStyle = {
  borderRadius: "15px",
  borderWidth: "1px",
}

export default function Outline({ sx, ...props }: BoxProps) {
  const theme = useTheme()
  // const { start, end } = theme.gradient.primary

  return (
    <Box
      sx={{
        ...sx,
        padding: outlineStyle.borderWidth,
        borderRadius: outlineStyle.borderRadius,
        // background: `linear-gradient(180deg, ${start} 0%, ${end} 100%)`,
      }}
      {...props}
    />
  )
}
