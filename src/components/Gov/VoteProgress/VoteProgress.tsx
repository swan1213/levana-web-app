import React from "react"
import { Box } from "@mui/material"

import { useSelectStyles } from "./voteProgressStyles"
import { VoteProgressProps } from "./voteProgressProps"

export default React.memo(function VoteProgress(props: VoteProgressProps) {
  const { yesPercents, noPercents, abstainPercents } = props
  const classes = useSelectStyles()

  return (
    <Box>
      <Box className={classes.progress}>
        <div
          className={classes.progressItem}
          style={{ width: yesPercents, background: "#eeb143" }}
        />
        <div
          className={classes.progressItem}
          style={{ width: noPercents, background: "#ff657f" }}
        />
        <div
          className={classes.progressItem}
          style={{ width: abstainPercents, background: "gray" }}
        />
      </Box>
    </Box>
  )
})
