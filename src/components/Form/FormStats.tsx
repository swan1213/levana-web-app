import { BoxProps } from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import { FormStatsItem } from "./types"

export interface FormStatsProps {
  items: FormStatsItem[]
}

export default function FormStats(props: FormStatsProps & BoxProps) {
  const { items, ...muiProps } = props

  return (
    <Stack {...muiProps} direction="column">
      {items.map((item, index) => (
        <Stack
          key={index}
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          sx={{ pt: index === 0 ? 0 : 0.5 }}
        >
          <Typography variant="body2" color="inherit">
            {item.title}
          </Typography>
          <Typography variant="body2" color="inherit">
            {item.value}
          </Typography>
        </Stack>
      ))}
    </Stack>
  )
}
