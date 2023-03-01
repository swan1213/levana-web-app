import { Box, Button } from "@mui/material/"
import { InfoOutlined } from "@mui/icons-material"
import { useForm } from "react-hook-form"
// import Link from "next/link"
import { useTranslations as useNextTranslations } from "next-intl"

import Card from "../Card"
import CoinFormControl from "../CoinFormControl"
import Notification from "../Notification"
import { useStyles } from "./manageStakeStyles"
import { ManageStakeTabPanelProps } from "./types"
import useManageStakeController from "./useManageStakeController"
// import { useTranslations } from "../../../utils/useTranslations"

type ErrorKey = string //"amount"
type ErrorType = string //"max" | "required"

export default function ManageStakeTabPanel(props: ManageStakeTabPanelProps) {
  const { tabKey, activeKey } = props
  const classes = useStyles()
  // const t = useTranslations()
  const t = useNextTranslations() // TODO: replace with above function

  const { control, formState, handleSubmit } = useForm()
  const { errors } = formState

  const {
    onSubmit,
    stakeResponse,
    unstakeResponse,
    maxValue,
    setAmount,
    hasBalanceError,
  } = useManageStakeController({ tabKey })

  const getError = (key: ErrorKey, type: ErrorType) =>
    t(`gov.manageStake.error.${key}.${type}`)

  return (
    <div
      role="tabpanel"
      hidden={tabKey !== activeKey}
      id={`stake-panel-${tabKey}`}
      aria-labelledby={`stake-panel-${tabKey}`}
    >
      {/* {(stakeResponse || unstakeResponse) && <Link href="/gov/" replace />} */}
      {tabKey === activeKey && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Card>
              <Box>
                <Box>
                  <CoinFormControl
                    name="amount"
                    balance={maxValue}
                    setValue={setAmount}
                    getError={getError}
                    control={control}
                    errors={errors}
                  />
                </Box>
                {tabKey === "stake" && (
                  <>
                    <Box className={classes.blockProtocol}>
                      <InfoOutlined
                        style={{ color: "grey", width: 20, marginRight: 8 }}
                      />{" "}
                      {t("gov.poll.manageStake.protocolLvn")}
                    </Box>
                  </>
                )}
              </Box>
            </Card>
            {hasBalanceError && (
              <Notification titleId="gov.poll.manageStake.insufficientLvn" />
            )}
            <Box className={classes.btnContainer}>
              <Button type="submit" size="large" variant="contained">
                {t(`gov.poll.manageStake.button.${tabKey}`)}
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </div>
  )
}
