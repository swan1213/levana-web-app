import Box from "@mui/material/Box"
import { useTheme } from "@mui/material/styles"
import { PropsWithChildren } from "react"
import PerpsMenu from "./PerpsMenu"

export const leftWidth = 290
export const margin = 2

export default function PerpsContainer(props: PropsWithChildren<unknown>) {
  const { children } = props
  const theme = useTheme()
  const marginPixels = theme.spacing(margin)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        columnGap: margin,
      }}
    >
      <Box sx={{ width: leftWidth }}>
        <Box
          sx={{
            position: "sticky",
            overflowY: "auto",
            top: 0,
            height: "100vh",
            bgcolor: ({ palette }) => palette.background.paper,
          }}
        >
          <PerpsMenu />
        </Box>
      </Box>
      <Box
        sx={{
          width: `calc(100% - ${leftWidth}px - ${marginPixels})`,
          display: "flex",
          flexGrow: 1,
          flexDirection: "row",
          alignItems: "start",
          columnGap: margin,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
