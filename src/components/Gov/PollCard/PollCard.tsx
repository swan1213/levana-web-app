import { Box } from "@mui/material"
import React from "react"
// import Link from "next/link"

import { useSelectStyles } from "./pollCardStyles"
import Card from "../Card"
import { Poll } from "../../../network/types/types"
import { endTimeString } from "../../../utils/endTimeString"
import VoteProgress from "../VoteProgress/VoteProgress"
import PollStatus from "../PollStatus/PollStatus"
import { getVoteResult } from "../VoteProgress/getVoteResult"
import { useTranslations } from "../../../utils/useTranslations"

export default React.memo(function PollCard({ poll }: { poll: Poll }) {
  const classes = useSelectStyles()
  const t = useTranslations()

  const endDate = endTimeString(poll)

  const { yesPercents, noPercents, abstainPercents } = getVoteResult({
    abstain: Number(poll.abstain_votes),
    yes: Number(poll.yes_votes),
    no: Number(poll.no_votes),
  })

  return (
    <div className={classes.container}>
      <Card key={poll.id}>
        <Box
          className={classes.pollItemContainer}
          // component={Link}
          // href={`/gov/poll/${poll.id}`}
        >
          <Box className={classes.titleBlock}>
            <span>ID: {poll.id}</span>
            <span>{poll.title}</span>
          </Box>
          <Box style={{ paddingTop: 20 }}>
            <PollStatus status={poll.status} />
            <div className={classes.title}>{poll.title}</div>
          </Box>
          <VoteProgress
            yesPercents={yesPercents}
            noPercents={noPercents}
            abstainPercents={abstainPercents}
          />
          <Box className={classes.creatorBlock}>
            <span>
              <span className={classes.creatorInfoTitle}>
                {t("gov.poll.status.endTime")}
              </span>
              <span className={classes.endDate}>{endDate}</span>
            </span>
          </Box>
        </Box>
      </Card>
    </div>
  )
})
