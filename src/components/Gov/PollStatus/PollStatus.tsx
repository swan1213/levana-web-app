import { useTranslations as useNextTranslations } from "next-intl"

import PollDetailIcon from "../../../icons/PollStatusIcon"
import { PollStatusRaw } from "../../../network/types/types"
import { getStatusIdent } from "./getStatusIdent"
import { useSelectStyles } from "./pollStatusStyle"
// import { useTranslations } from "../../../utils/useTranslations"

export default function PollStatus(props: { status: PollStatusRaw }) {
  const { status } = props
  const classes = useSelectStyles()
  // const t = useTranslations()
  const t = useNextTranslations() // TODO: replace with above function

  return (
    <>
      <PollDetailIcon status={status} />
      <span className={classes.status}>{t(getStatusIdent(status))}</span>
    </>
  )
}
