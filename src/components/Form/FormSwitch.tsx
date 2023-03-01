import Box from "@mui/material/Box"
import { PropsWithChildren } from "react"

import FormResponse from "./FormResponse"
import { FormResultProps } from "./types"
import { SectionProps } from "../common/Section/Section"

export type FormContainerContentProps = PropsWithChildren<
  FormResultProps & SectionProps
>

export default function FormSwitch(props: FormContainerContentProps) {
  const { children, ...responseProps } = props

  return (
    <Box sx={{ position: "relative", borderRadius: 4, overflow: "hidden" }}>
      {children}
      <FormResponse {...responseProps} />
    </Box>
  )
}
