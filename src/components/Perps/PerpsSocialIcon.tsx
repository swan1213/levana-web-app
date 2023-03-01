import { IconContext } from "react-icons"
import Box from "@mui/material/Box"

import useTheme from "../../theme/useTheme"

export type PerpsSocialIconProps = {
  icon: JSX.Element
  link: string
}

const PerpsSocialIcon = ({ icon, link }: PerpsSocialIconProps): JSX.Element => {
  const theme = useTheme()

  return (
    <IconContext.Provider
      value={{
        style: {
          width: "50%",
          height: "auto",
        },
      }}
    >
      <Box
        onClick={() => {
          console.log(`TODO: Link to ${link}`)
        }}
        sx={{
          color: theme.palette.text.secondary,
          cursor: "pointer",
          "&:hover": {
            color: theme.palette.text.primary,
          },
        }}
      >
        {icon}
      </Box>
    </IconContext.Provider>
  )
}

export default PerpsSocialIcon
