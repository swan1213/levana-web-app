import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"

import { BoxProps } from "@mui/material/Box"
import Typography from "@mui/material/Typography"

export type PerpsRollerBlindProps = {
  title: string
  isExpanded: boolean
  onClick: React.MouseEventHandler
} & BoxProps

const PerpsRollerBlind = ({
  title,
  isExpanded,
  onClick,
  children,
  sx,
}: PerpsRollerBlindProps): JSX.Element => {
  const accordionSpacing = 1

  return (
    <Accordion
      sx={{
        mb: accordionSpacing,
        borderRadius: 4,
        "::before": { backgroundColor: "transparent" },
        ...sx,
      }}
      expanded={isExpanded}
      disableGutters
    >
      <AccordionSummary onClick={onClick}>
        <Typography variant="subtitle2">{title}</Typography>
      </AccordionSummary>

      {children && <AccordionDetails>{children}</AccordionDetails>}
    </Accordion>
  )
}

export default PerpsRollerBlind
