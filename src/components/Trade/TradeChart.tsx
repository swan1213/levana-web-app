import Box from "@mui/material/Box"

export default function TradeChart() {
  return (
    <Box
      sx={{
        height: "100px",
        borderRadius: ({ spacing }) => spacing(1),
        bgcolor: ({ palette }) => palette.background.paper,
      }}
    >
      chart goes here
    </Box>
  )
}
