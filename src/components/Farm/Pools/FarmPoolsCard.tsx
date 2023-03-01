import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Stack from "@mui/material/Stack"
import { useConnectedWallet } from "@terra-money/wallet-provider"
import Link from "next/link"
import { useMemo } from "react"

import Section from "../../common/Section/Section"
import SectionHeader from "../../common/Section/SectionHeader"
import StatLabel from "../../common/StatLabel"
import { useTranslations } from "../../../utils/useTranslations"
import { useStakingPool } from "../../../network/queries/stake/useStakingPool"
import AssetGroup from "../../../network/common/assets/assetGroup"
import FormSwitch from "../../Form/FormSwitch"
import { useFormController } from "../../Form/useFormController"
import { useRedeem } from "../../../network/transactions/staking/useRedeem"

export interface FarmPoolsCardProps {
  assetGroup: AssetGroup
}

export default function FarmPoolsCard(props: FarmPoolsCardProps) {
  const { primaryAsset, secondaryAsset, lpAsset } = props.assetGroup
  const { pool, staker, refetch } = useStakingPool(lpAsset.id)
  const t = useTranslations("farm.main.pool")
  const wallet = useConnectedWallet()

  const title = `${primaryAsset.name} - ${secondaryAsset.name}`
  const hash = `provide/${primaryAsset.symbol}`

  const hasRewards = (staker?.rewardAsset.amount.toInt() ?? 0) > 0

  const stats = useMemo(() => {
    const stats: Record<string, string | undefined> = {
      apr: undefined,
      lpTotal: undefined,
      lp: undefined,
      earned: undefined,
    }

    if (pool) {
      stats.lpTotal = pool.totalBondedAsset.toFormattedAbbreviateAmount()
    }

    if (staker) {
      stats.lp = staker.bondedAsset.toFormattedAbbreviateAmount()
      stats.earned = staker.rewardAsset.toFormattedAbbreviateAmount()
    }

    return stats
  }, [pool, staker])

  const transaction = useRedeem().useTransaction({ asset: lpAsset })

  const { result, onSubmit, onDismiss } = useFormController({
    transaction,
    handleResponseDismissal: refetch,
  })

  return (
    <FormSwitch result={result} onDismiss={onDismiss}>
      <Section>
        <SectionHeader title={title} />
        <Stack direction="column" spacing={1}>
          {/* <StatLabel
          direction="row"
          title={t("apr.title")}
          value={stats.apr}
          tooltip={t("apr.tip")}
        /> */}
          <StatLabel
            direction="row"
            title={t("lpTotal.title")}
            value={stats.lpTotal}
            // tooltip={t("lpTotal.tip")}
          />
          {wallet && (
            <>
              <Divider />
              <StatLabel
                direction="row"
                title={t("lp.title")}
                value={stats.lp}
                // tooltip={t("lp.tip")}
              />
              <StatLabel
                direction="row"
                title={t("earned.title")}
                value={stats.earned}
                // tooltip={t("earned.tip")}
              />
            </>
          )}
        </Stack>
        <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
          {hasRewards && (
            <Button variant="contained" onClick={onSubmit}>
              {t("claim.title")}
            </Button>
          )}
          <Link href={{ hash }} passHref>
            <Button variant="contained" sx={{ flexGrow: 1 }}>
              {t("open.title")}
            </Button>
          </Link>
        </Stack>
      </Section>
    </FormSwitch>
  )
}
