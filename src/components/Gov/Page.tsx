import Container from "@mui/material/Container"

import { PropsWithChildren } from "react"

export default function Page(props: PropsWithChildren<unknown>) {
  return <Container maxWidth="md" {...props} />
}
