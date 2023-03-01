import { BoxProps } from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Popover from "@mui/material/Popover"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import SettingsIcon from "@mui/icons-material/Settings"
import { useState } from "react"

import { useTranslations } from "../../utils/useTranslations"
import { defaultSlippageTolerance } from "../../network/constants/config"

export interface FormSlippage extends BoxProps {
  slippage: number
  setSlippage: React.Dispatch<React.SetStateAction<number>>
}

const formatOption = (option: number) => `${option * 100}%`

export default function FormSlippage(props: FormSlippage) {
  const { slippage, setSlippage, ...muiProps } = props

  const slippageOptions = [0.001, 0.005, defaultSlippageTolerance]

  const t = useTranslations()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>()
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(undefined)

  const handleOption = (
    event: React.MouseEvent<HTMLElement>,
    option: number | null
  ) => option !== null && setSlippage(option)

  return (
    <>
      <Stack
        {...muiProps}
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
      >
        <Typography variant="body2" color="inherit">
          {t("exchange.form.slippage.title")}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          endIcon={<SettingsIcon />}
          color="inherit"
          onClick={handleClick}
        >
          {formatOption(slippage)}
        </Button>
      </Stack>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{ mt: 1 }}
      >
        <ToggleButtonGroup
          size="small"
          value={slippage}
          exclusive
          onChange={handleOption}
          fullWidth
          sx={{ p: 1 }}
        >
          {slippageOptions.map((option, index) => (
            <ToggleButton key={index} value={option}>
              {formatOption(option)}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Popover>
    </>
  )
}
