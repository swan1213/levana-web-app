import { Box, Typography, Button } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"

import { useGovPolls } from "../../../network/queries/gov/useGovPolls"
import Card from "../Card"
import Page from "../Page"
import { useSelectStyles } from "./pollInfoStyles"
import getCompactHash from "../../../utils/getCompactHash"
import { getVoteResult } from "../VoteProgress/getVoteResult"
import VoteProgress from "../VoteProgress/VoteProgress"
import { PollVote, VoteOption } from "../../../network/types/types"
import { endTimeString } from "../../../utils/endTimeString"
import { useGovVoters } from "../../../network/queries/gov/useGovVoters"
import PollStatus from "../PollStatus/PollStatus"
import { levanaTokenAsset } from "../../../network/constants/foundation"
import { Asset } from "../../../network"
import { useTranslations } from "../../../utils/useTranslations"

export const pollInfoPath = "/gov/poll/:id"

interface UsePollInfoControllerProps {
  id: string
}

const usePollInfoController = ({ id }: UsePollInfoControllerProps) => {
  const { polls } = useGovPolls()

  const pollData = (polls ?? []).find((pollData) => pollData.id === +id)

  const { voters } = useGovVoters(pollData?.id || 0)

  return { pollData, votersData: voters ?? [] }
}

export default function PollInfo() {
  const router = useRouter()
  const id = router.query.id as string
  const { pollData, votersData } = usePollInfoController({ id })
  const t = useTranslations()

  const classes = useSelectStyles()

  if (!pollData) {
    return null
  }

  const toLvn = (val: string) => new Asset(levanaTokenAsset.address, val)

  const endDate = endTimeString(pollData)

  const getVoteId = (vote: VoteOption) => {
    switch (vote) {
      case VoteOption.YES:
        return t("gov.poll.status.voteDetails.yes")
      case VoteOption.NO:
        return t("gov.poll.status.voteDetails.no")
      case VoteOption.ABSTAIN:
        return t("gov.poll.status.voteDetails.abstain")
    }
  }

  const { yesPercents, noPercents, abstainPercents } = getVoteResult({
    abstain: Number(pollData.abstain_votes),
    yes: Number(pollData.yes_votes),
    no: Number(pollData.no_votes),
  })

  const Voter = ({ voter, vote, balance }: PollVote) => (
    <Box className={classes.voterData}>
      <div>{voter}</div>
      <div>{getVoteId(vote)}</div>
      <div>{balance.toFormattedAmount()}</div>
    </Box>
  )

  return (
    <Page>
      <Box style={{ paddingTop: 40 }}>
        <Typography variant="h1">{t("gov.poll.status.details")}</Typography>
        <Card>
          <Box>
            <Box className={classes.titleBlock}>
              <span>
                {t("gov.poll.createModal.pollId")}
                {": "}
                {pollData.id}
              </span>
              <span>{pollData.title}</span>
            </Box>
            <Box style={{ paddingTop: 20 }}>
              <PollStatus status={pollData.status} />
              <div>{pollData.title}</div>
            </Box>

            <Box className={classes.wrapper}>
              <span className={classes.blockInfoTitle}>Creator</span>
              <Link href="/">
                {getCompactHash(pollData.creator)}
                {t("gov.poll.status.creator")}
              </Link>
              <span>
                <span className={classes.blockInfoTitle}>
                  {t("gov.poll.status.endTime")}
                </span>
                <span className={classes.info}>{endDate}</span>
              </span>
            </Box>
          </Box>

          <Box className={classes.button}>
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 3, width: "50%" }}
              // component={Link}
              // href={`/gov/poll/${pollData.id}/vote`}
            >
              {t("gov.poll.status.vote")}
            </Button>
          </Box>
        </Card>
        <Card>
          <Box>
            <Box className={classes.titleBlock}>
              {t("gov.poll.createModal.description")}
            </Box>
            <div className={classes.description}>{pollData.description}</div>

            {!!pollData.link && (
              <div className={classes.linkBlock}>
                <div className={classes.titleBlock}>
                  {t("gov.poll.status.link")}
                </div>
                <Link href="/">{pollData.link}</Link>
              </div>
            )}
          </Box>
        </Card>
        <Card>
          <Typography variant="caption">
            {t("gov.poll.status.voteDetails.title")}
          </Typography>
          <VoteProgress
            yesPercents={yesPercents}
            noPercents={noPercents}
            abstainPercents={abstainPercents}
          />
          <Box className={classes.voteAnswers}>
            <Box className={classes.answerYes}>
              <div>{t("gov.poll.status.voteDetails.yes")}</div>
              <div>{yesPercents}</div>
              <div>{toLvn(pollData.yes_votes).toFormattedAmount()}</div>
            </Box>
            <Box className={classes.answerNo}>
              <div>{t("gov.poll.status.voteDetails.no")}</div>
              <div>{noPercents}</div>
              <div>{toLvn(pollData.no_votes).toFormattedAmount()}</div>
            </Box>

            <Box className={classes.answerAbstain}>
              <div>{t("gov.poll.status.voteDetails.abstain")}</div>
              <div>{abstainPercents}</div>
              <div>{toLvn(pollData.abstain_votes).toFormattedAmount()}</div>
            </Box>
          </Box>
        </Card>

        <Card>
          <Box>
            <Box className={classes.votersHeader}>
              <div>{t("gov.poll.status.voteDetails.voter")}</div>
              <div>{t("gov.poll.status.voteDetails.vote")}</div>
              <div>{t("gov.poll.status.voteDetails.balance")}</div>
            </Box>
            <Box>{votersData.map(Voter)}</Box>
          </Box>
        </Card>
      </Box>
    </Page>
  )
}
