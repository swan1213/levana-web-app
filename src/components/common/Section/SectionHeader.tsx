import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

export interface SectionHeaderProps {
  Icon?: () => JSX.Element
  title: string
}

export default function SectionHeader(props: SectionHeaderProps) {
  const { Icon, title } = props

  return (
    <Box sx={{ display: "flex", mb: 1.5 }}>
      {Icon && (
        <Box>
          <Icon />
        </Box>
      )}
      <Box>
        <Typography variant="subtitle1" component="h2" color="inherit">
          {title}
        </Typography>
      </Box>
    </Box>
  )
}
