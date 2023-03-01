import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup, {
  ToggleButtonGroupProps,
} from "@mui/material/ToggleButtonGroup"

export interface TabToggleProps<T extends string>
  extends ToggleButtonGroupProps {
  value: T
  buttons: TabToggleButton<T>[]
  onChange(event: React.MouseEvent<HTMLElement>, value: T): void
}

interface TabToggleButton<T> {
  value: T
  title: string
}

export default function TabToggle<T extends string>(props: TabToggleProps<T>) {
  const { sx, buttons, onChange, value } = props

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    value: T | null
  ) => {
    if (value !== null) {
      onChange(event, value)
    }
  }

  return (
    <ToggleButtonGroup
      value={value}
      onChange={handleChange}
      exclusive
      sx={{
        ...sx,
        display: "flex",
        bgcolor: ({ palette }) => palette.background.paper,
        p: 2,
        borderTopLeftRadius: ({ spacing }) => spacing(2),
        borderTopRightRadius: ({ spacing }) => spacing(2),
      }}
    >
      {buttons.map((button, idx) => (
        <ToggleButton value={button.value} sx={{ flexGrow: 1 }} key={idx}>
          {button.title}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
