import { Box, Button } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"
// import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslations as useNextTranslations } from "next-intl"

import Card from "../Card"
import CoinFormControl from "../CoinFormControl"
import { useSelectStyles } from "./voteStyles"
import Notification from "../Notification"
import { useLvnBalance } from "../../../network/queries/asset/useLvnBalance"
import ModalVoteSubmit from "./ModalVoteSubmit"
import TxFee from "../TxFee"
import Asset from "../../../network/common/assets/asset"
import useCastVoteController from "./useCastVoteController"
import { VoteOption } from "../../../network/types/types"
import { levanaTokenAsset } from "../../../network/constants/foundation"
import { useGovStaked } from "../../../network/queries/gov/useGovStaked"
import Amount from "../../../network/common/amount"
// import { useTranslations } from "../../../utils/useTranslations"

export const votePagePath = "/gov/poll/:id/vote"

export default function VotePage() {
  // FIXME need to check if the user is allowed to vote
  const { asset: balance } = useLvnBalance()

  const [amount, setAmount] = useState("")
  const [voteOption, setVoteOption] = useState<VoteOption>()
  const router = useRouter()
  const id = router.query.id as string
  const clasess = useSelectStyles()
  // const t = useTranslations()
  const t = useNextTranslations() // TODO: replace with above function

  const { onSubmit, onClose, shouldRedirect, vote } = useCastVoteController(+id)

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const alreadyVoted = 0 // FIXME

  const { staked } = useGovStaked()
  const stakedAmount = staked?.amount.toInt() ?? 0
  const entered = new Asset(levanaTokenAsset.address, new Amount(amount, true))
  const hasBalanceError = entered.amount.toInt() + alreadyVoted > stakedAmount

  const makeHandleVoteClick = (value: VoteOption) => () => {
    setVoteOption(value)
  }

  const onSubmitHelper = () => {
    voteOption &&
      onSubmit({
        id: +id,
        answer: voteOption,
        deposit: entered,
      })
  }

  const getError = (key: string, type: string) =>
    t(`gov.vote.error.${key}.${type}`)

  return (
    <div className={clasess.voteContainer}>
      {/* {shouldRedirect && <Link href={`/gov/poll/${id}`} replace />} */}
      <form onSubmit={handleSubmit(onSubmitHelper)}>
        <Box className={clasess.voteBox}>
          <Card>
            <Box className={clasess.voteBox}>
              <Box className={clasess.amountBlock}>
                <Button
                  onClick={makeHandleVoteClick(VoteOption.YES)}
                  className={clasess.btnYes}
                >
                  {t("gov.poll.status.voteDetails.yes")}
                </Button>
                <Button
                  className={clasess.btnNo}
                  onClick={makeHandleVoteClick(VoteOption.NO)}
                >
                  {t("gov.poll.status.voteDetails.no")}
                </Button>
                <Button
                  onClick={makeHandleVoteClick(VoteOption.ABSTAIN)}
                  className={clasess.btnAbstain}
                >
                  {t("gov.poll.status.voteDetails.abstain")}
                </Button>
              </Box>
              {balance && (
                <CoinFormControl
                  name="amount"
                  balance={balance}
                  setValue={setAmount}
                  getError={getError}
                  control={control}
                  errors={errors}
                />
              )}
            </Box>
            <TxFee id={id} txFee="" currency="" />
          </Card>
        </Box>

        {hasBalanceError && (
          <Notification titleId="gov.poll.vote.insufficientLvn" />
        )}

        <Button type="submit" style={{ marginTop: 20 }} variant="contained">
          {t("gov.poll.vote.submit")}
        </Button>
        {vote && (
          <ModalVoteSubmit
            open={true}
            answer={vote.answer}
            id={id}
            onClose={onClose}
            txFee={vote.txfee}
            txHash={vote.txhash}
          />
        )}
      </form>
    </div>
  )
}
