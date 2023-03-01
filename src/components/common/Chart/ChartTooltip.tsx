import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { TooltipProps } from "recharts/types/component/Tooltip"
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent"

export default function ChartTooltip(props: TooltipProps<ValueType, NameType>) {
  const { active, payload: layers } = props

  if (!active || !layers || layers.length === 0) {
    return null
  }

  const [layer] = layers
  const item = layer.payload

  if (!item) {
    return null
  }

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        bgcolor: ({ palette }) => palette.primary.main,
        color: ({ palette }) => palette.primary.contrastText,
        px: 1,
        py: 0.2,
        borderRadius: 2,
      }}
    >
      {item.date && <Typography variant="caption">{item.date}</Typography>}
      {item.prices && (
        <Typography variant="caption">{item.prices.formatted}</Typography>
      )}
    </Stack>
  )
}
