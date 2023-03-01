import LoadingButton from "@mui/lab/LoadingButton"
import { ButtonProps } from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"

// TODO: LoadingButtonProps hangs `yarn build`. Reevaluate once merged to material
export interface FormButtonProps extends ButtonProps {
  loading?: boolean
}

export default function FormButton(props: FormButtonProps) {
  return (
    <LoadingButton
      {...props}
      variant="contained"
      size="large"
      fullWidth
      loadingIndicator={<CircularProgress sx={{ color: "white" }} size={16} />}
    />
  )
}
