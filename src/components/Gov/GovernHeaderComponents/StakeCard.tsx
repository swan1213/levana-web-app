import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

// import Link from "next/link"

import Card from "../Card"
import { manageStakePath } from "../ManageStake/ManageStakeTabs"
import { useGovStaked } from "../../../network/queries/gov/useGovStaked"
import { useTranslations } from "../../../utils/useTranslations"

const useStakeCardController = () => {
  const { totalLvn, staked, stakable, pendingVotingRewards, error } =
    useGovStaked()

  const stakedContent = () => {
    if (totalLvn && staked && stakable && pendingVotingRewards) {
      return [
        totalLvn.toFormattedAmount(),
        staked.toFormattedAmount(),
        stakable.toFormattedAmount(),
        pendingVotingRewards.toFormattedAmount(),
        pendingVotingRewards.amount.toInt() > 0,
      ]
    } else {
      return ["---", "---", "---", "---", false]
    }
  }

  return { stakedContent }
}

export default function StakeCard() {
  const t = useTranslations()
  const { stakedContent } = useStakeCardController()
  const [total, staked, stakable, pending_rewards] = stakedContent() // in the future: add fifth element hasRewards

  return (
    <div style={{ width: 400 }}>
      <Card>
        <Box>{t("gov.stake.title")}</Box>
        <p>
          {t("gov.stake.total")} {total}
        </p>
        <p>
          {t("gov.stake.staked")} {staked}
        </p>
        <p>
          {t("gov.stake.stakable")} {stakable}
        </p>
        <p>
          {t("gov.stake.pendingRewards")} {pending_rewards}
        </p>

        <Button
          sx={{ mt: 3, width: "100%" }}
          variant="contained"
          // component={Link}
          // href={manageStakePath}
        >
          {t("gov.stake.manageStake")}
        </Button>
      </Card>
    </div>
  )
}
