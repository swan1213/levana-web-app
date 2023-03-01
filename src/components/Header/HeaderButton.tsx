import Button, { ButtonProps } from "@mui/material/Button"
import { styled } from "@mui/material/styles"

const HeaderButton = styled(Button)<ButtonProps>(({ theme }) => ({
  textTransform: "none",
  fontWeight: "bold",
  color: theme.palette.text.primary,
}))

export default HeaderButton
