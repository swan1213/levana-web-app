import { useTheme } from "@mui/material/styles"
import { AreaChart, Tooltip, Area, ResponsiveContainer } from "recharts"

import { ChartItem } from "../../../types/chart"
import ChartTooltip from "./ChartTooltip"

export interface ChartProps {
  assetId: string
  items: ChartItem[]
}

export default function Chart(props: ChartProps) {
  const { assetId, items } = props
  const theme = useTheme()

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={items}>
        <Area
          key={assetId}
          type="monotone"
          name={assetId}
          dataKey="prices.number"
          stroke={theme.palette.primary.main}
          strokeWidth={2}
          fillOpacity={0}
        />
        <Tooltip content={ChartTooltip} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
