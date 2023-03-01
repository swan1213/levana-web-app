import { BoxProps } from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"
import Tooltip from "@mui/material/Tooltip"
import Typography, { TypographyProps } from "@mui/material/Typography"
import InfoIcon from "@mui/icons-material/Info"

type StatLabelSize = "small" | "medium" | "large" | "xlarge"

export interface StatLabelProps extends BoxProps {
  direction?: "row" | "column"
  title: string
  titleColor?: string
  titleSize?: StatLabelSize
  value?: string
  valueColor?: string
  valueSize?: StatLabelSize
  tooltip?: string
}

export default function StatLabel(props: StatLabelProps) {
  const {
    direction,
    title,
    titleColor = "text.secondary",
    titleSize,
    value,
    valueColor = "text.primary",
    valueSize,
    tooltip,
    ...muiProps
  } = props

  const spacing = direction === "row" ? 1 : 0
  const tooltipAlign = direction === "row" ? "center" : "baseline"

  const size = (labelSize?: StatLabelSize): TypographyProps | undefined => {
    if (!labelSize) {
      return
    }

    switch (labelSize) {
      case "small":
        return { variant: "body2" }
      case "medium":
        return { variant: "body1" }
      case "large":
        return { fontSize: "large" }
      case "xlarge":
        return { fontSize: "x-large" }
    }
  }

  return (
    <Stack direction={direction} alignItems="baseline" spacing={spacing}>
      <Stack {...muiProps} direction="row" alignItems={tooltipAlign}>
        <Typography {...size(titleSize)} color={titleColor} whiteSpace="nowrap">
          {title}
        </Typography>
        {tooltip && (
          <Tooltip title={tooltip}>
            <IconButton size="small" color="primary">
              <InfoIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
      {value ? (
        <Typography {...size(valueSize)} color={valueColor} whiteSpace="nowrap">
          {value}
        </Typography>
      ) : (
        <Skeleton variant="text" width="100%" />
      )}
    </Stack>
  )
}
