import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
// import Link from "next/link"

import Page from "../Gov/Page"
// import { createPollPath } from "./CreatePoll/CreatePoll"
import PollCards from "../Gov/PollCards/PollCards"
import Govern from "../Gov/GovernHeaderComponents/Govern"

export const govPath = "/gov"

export default function Gov() {
  return (
    <Page>
      <Box>
        <h1>Govern</h1>
        <Button
          variant="outlined"
          href="https://forum.levana.finance"
          target="_blank"
        >
          Join Forum
        </Button>
        {/* <Button variant="outlined" component={Link} href={createPollPath}>
          Create Poll
        </Button> */}
      </Box>
      <Govern />
      <PollCards />
    </Page>
  )
}
