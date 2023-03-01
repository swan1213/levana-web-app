import Box, { BoxProps } from "@mui/material/Box"
import { useTheme } from "@mui/material/styles"

import Outline, { outlineStyle } from "./Outline"

export const cardStyle = {
  offsetX: 2.5,
  offsetY: 2.5,
}

export default function Card({ sx, ...props }: BoxProps) {
  const theme = useTheme()
  const { start, end } = theme.gradient.background

  return (
    <Outline mt={3}>
      <Box
        sx={{
          ...sx,
          px: cardStyle.offsetX,

          py: cardStyle.offsetY,
          borderRadius: outlineStyle.borderRadius,
          background: `linear-gradient(180deg, ${start} 0%, ${end} 100%)`,
        }}
        {...props}
      />
    </Outline>
  )
}
