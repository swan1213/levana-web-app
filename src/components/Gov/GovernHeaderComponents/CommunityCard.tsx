import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import InfoOutlined from "@mui/icons-material/InfoOutlined"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"

import { useTranslations } from "../../../utils/useTranslations"
import Card from "../Card"
import LevanaIcon from "../../../icons/LevanaIcon"
import { useGovState } from "../../../network/queries/gov/useGovState"
import { levanaTokenAsset } from "../../../network/constants/foundation"
import { Asset } from "../../../network"

type TooltipSection =
  | "pollCount"
  | "totalStaked"
  | "totalLocked"
  | "rewards"
  | "apr"

function TooltippedInfo(props: { section: TooltipSection; value: string }) {
  const { section, value } = props
  const t = useTranslations()
  const title = `gov.community.${section}.title` as const
  const tooltip = `gov.community.${section}.tooltip` as const

  return (
    <>
      <Grid item md={6} sx={{ textAlign: "right" }}>
        <Typography variant="caption" />
        {t(title)}
        <Tooltip describeChild title={t(tooltip)}>
          <InfoOutlined style={{ color: "grey", width: 20, marginRight: 8 }} />
        </Tooltip>
      </Grid>
      <Grid item md={6} sx={{ textAlign: "left" }}>
        {value}
      </Grid>
    </>
  )
}

export default function CommunityCard() {
  const { state } = useGovState()
  const t = useTranslations()

  const lvnAsset = (amount: string): Asset =>
    new Asset(levanaTokenAsset.address, amount)

  return (
    <div style={{ width: "calc(100% / 2)" }}>
      <Card>
        <Box>
          <Box>{t("gov.community.title")}</Box>
          <LevanaIcon />
        </Box>
        {(state && (
          <Grid container>
            <TooltippedInfo
              section="pollCount"
              value={state.poll_count.toString()}
            />
            <TooltippedInfo
              section="totalStaked"
              value={lvnAsset(state.total_share).toFormattedAmount()}
            />
            <TooltippedInfo
              section="totalLocked"
              value={lvnAsset(state.total_deposit).toFormattedAmount()}
            />
            <TooltippedInfo
              section="rewards"
              value={lvnAsset(state.pending_voting_rewards).toFormattedAmount()}
            />
          </Grid>
        )) ||
          t("generic.loading")}
      </Card>
    </div>
  )
}
