import InfoOutlined from "@mui/icons-material/InfoOutlined"
import {
  Box,
  FormControl,
  Button,
  FormLabel,
  TextField,
  Tooltip,
} from "@mui/material"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
// import Link from "next/link"

import Page from "../Page"
import DepositIcon from "../../../icons/PollIcons/Depositicon"
import {
  FORM_SIZE,
  CHECK_URL_REGEXP,
  CURRENCY,
  DEFAULT_DEPOSIT,
} from "./constants"
import CreatePollModal from "./CreatePollModal"
import useCreatePollController from "./useCreatePollController"
import { useLvnBalance } from "../../../network/queries/asset/useLvnBalance"
import { TxFeeContainer, useStyles } from "./createPollStyles"
import Card from "../Card"
import Notification from "../Notification"
import { useTranslations } from "../../../utils/useTranslations"

type ErrorKey = "title" | "description" | "information" | "deposit"
type ErrorType = "minLength" | "required"

export const createPollPath = "/gov/poll/create"

export default function CreatePoll() {
  const [deposit, setDeposit] = useState<number>(DEFAULT_DEPOSIT)
  const { onSubmit, onClose, shouldRedirect, createdPollInfo } =
    useCreatePollController()
  const t = useTranslations()

  const getError = (key: ErrorKey, type: ErrorType) =>
    t(`gov.poll.submit.error.${key}.${type}`)

  const { register, handleSubmit, control, formState } = useForm()
  const { errors } = formState

  const classes = useStyles()

  const TX_FEE = (deposit * 0.001).toFixed(2)

  const levanaBalanceRaw = useLvnBalance().asset
  const levanaBalance = levanaBalanceRaw?.toFormattedAmount() || "0"
  const levanaBalanceNumber = levanaBalanceRaw?.amount.toDecimal() || 0
  const hasBalanceError = !levanaBalance || deposit > levanaBalanceNumber

  return (
    <Page>
      {/* {shouldRedirect && <Link href={"/gov/poll/" + shouldRedirect} replace />} */}
      <Box width={550}>
        <form
        // onSubmit={handleSubmit(onSubmit)}
        >
          <Card>
            <Box marginBottom={3}>{t("gov.poll.submit.header")}</Box>

            <Box sx={FORM_SIZE}>
              <FormControl style={{ marginTop: 30 }} fullWidth={true}>
                <FormLabel htmlFor="title">
                  {t("gov.poll.submit.title")}
                </FormLabel>
                <TextField
                  id="title"
                  variant="outlined"
                  helperText={
                    !!errors.title && getError("title", errors.title.type)
                  }
                  className={classes.textField}
                  error={!!errors.title}
                  {...register("title", {
                    required: true,
                    minLength: 4,
                    maxLength: 100,
                  })}
                />
              </FormControl>

              <FormControl style={{ marginTop: 30 }} fullWidth={true}>
                <FormLabel htmlFor="description">
                  {t("gov.poll.submit.description")}
                </FormLabel>
                <TextField
                  id="description"
                  variant="outlined"
                  helperText={
                    !!errors.description &&
                    getError("description", errors.description.type)
                  }
                  error={!!errors.description}
                  className={classes.textField}
                  {...register("description", {
                    required: true,
                    minLength: 10,
                    maxLength: 500,
                  })}
                />
              </FormControl>

              <FormControl style={{ marginTop: 30 }} fullWidth={true}>
                <FormLabel htmlFor="information">
                  {t("gov.poll.submit.link")}
                </FormLabel>
                <TextField
                  id="information"
                  variant="outlined"
                  className={classes.textField}
                  helperText={
                    !!errors.information &&
                    getError("information", errors.information.type)
                  }
                  error={!!errors.information}
                  {...register("information", {
                    pattern: CHECK_URL_REGEXP,
                  })}
                />
              </FormControl>
              <FormControl style={{ marginTop: 30 }} fullWidth={true}>
                <Box display="flex" justifyContent="space-between">
                  <FormLabel htmlFor="deposit">
                    <Tooltip title={t("gov.poll.submit.deposit")}>
                      <>
                        {t("gov.poll.submit.deposit")}
                        <Tooltip
                          describeChild
                          title={t("gov.poll.submit.depositTooltip")}
                        >
                          <InfoOutlined />
                        </Tooltip>
                      </>
                    </Tooltip>
                  </FormLabel>
                  <div>
                    <DepositIcon />
                    <span style={{ marginLeft: 10 }}>{levanaBalance}</span>
                  </div>
                </Box>

                <Controller
                  name="deposit"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  defaultValue={DEFAULT_DEPOSIT}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="deposit"
                      variant="outlined"
                      type="number"
                      value={value}
                      autoFocus={false}
                      helperText={
                        !!errors.deposit &&
                        getError("deposit", errors.deposit.type)
                      }
                      onChange={(event) => {
                        const nextValue = Number(event.target.value)
                        onChange(nextValue)
                        setDeposit(nextValue)
                      }}
                      className={classes.textField}
                      error={!!errors.deposit}
                    />
                  )}
                ></Controller>
              </FormControl>

              <div style={TxFeeContainer}>
                {t("gov.poll.submit.fee")}
                <Tooltip title={t("gov.poll.submit.feeTooltip")}>
                  <InfoOutlined />
                </Tooltip>
                <p>
                  {TX_FEE} {CURRENCY}
                </p>
              </div>
            </Box>
          </Card>

          {hasBalanceError && (
            <Notification titleId="gov.poll.submit.insufficientLvn" />
          )}

          <div style={{ marginTop: 20 }}>
            <Button type="submit" size="large" variant="contained">
              Submit
            </Button>
            {createdPollInfo && (
              <CreatePollModal
                open={true}
                onClose={onClose}
                pollInfo={createdPollInfo}
              />
            )}
          </div>
        </form>
      </Box>
    </Page>
  )
}
