import Paper, { PaperProps } from "@mui/material/Paper"
import { alpha } from "@mui/material/styles"

export interface SectionProps extends PaperProps {
  bgAlpha?: number
}

export default function Section1(props: SectionProps) {
  const { bgAlpha, sx, ...muiProps } = props

  return (
    <Paper
      {...muiProps}
      elevation={0}
      sx={{
        ...sx,
        backgroundColor: ({ palette }) =>
          alpha(palette.background.paper, bgAlpha ?? 1),
        borderRadius: ({ spacing }) => spacing(2),
        padding: ({ spacing }) => spacing(2),
      }}
    />
  )
}
