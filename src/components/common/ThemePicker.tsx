import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup, {
  ToggleButtonGroupProps,
} from "@mui/material/ToggleButtonGroup"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness"
import { useRecoilState } from "recoil"

import { paletteModeState, PaletteMode } from "../../theme/paletteModeState"

export default function ThemePicker(props: ToggleButtonGroupProps) {
  const [paletteMode, setPaletteMode] = useRecoilState(paletteModeState)

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    paletteMode: PaletteMode
  ) => paletteMode !== null && setPaletteMode(paletteMode)

  return (
    <ToggleButtonGroup
      {...props}
      value={paletteMode}
      exclusive
      onChange={handleChange}
      size="small"
      aria-label="color mode"
    >
      {/* TODO: localize */}
      <ToggleButton value={PaletteMode.light} aria-label="light mode">
        <LightModeIcon fontSize="small" />
      </ToggleButton>
      <ToggleButton value={PaletteMode.auto} aria-label="auto mode">
        <SettingsBrightnessIcon fontSize="small" />
      </ToggleButton>
      <ToggleButton value={PaletteMode.dark} aria-label="dark mode">
        <DarkModeIcon fontSize="small" />
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
