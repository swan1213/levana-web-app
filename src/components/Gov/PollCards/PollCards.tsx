import Typography from "@mui/material/Typography"
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useState } from "react"
import { useTranslations as useNextTranslations } from "next-intl"

import PollCard from "../PollCard/PollCard"
import { useGovPolls } from "../../../network/queries/gov/useGovPolls"
import { Poll, PollStatusFilterObj } from "../../../network/types/types"
import { getStatusIdent } from "../PollStatus/getStatusIdent"
import { useStyles } from "./pollCardsStyles"
// import { useTranslations } from "../../../utils/useTranslations"

export default function PollCards() {
  const { polls } = useGovPolls()
  const [status, setStatus] = useState<string>("all")
  // const t = useTranslations()
  const t = useNextTranslations() // TODO: replace with above function

  const activePolls = (polls ?? []).filter(
    (poll: Poll) => status === "all" || poll.status === status
  )

  const classes = useStyles()

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value)
  }

  const filters = [
    PollStatusFilterObj.all,
    PollStatusFilterObj.inProgress,
    PollStatusFilterObj.passed,
    PollStatusFilterObj.rejected,
    PollStatusFilterObj.executed,
  ]

  return (
    <div style={{ paddingTop: 40 }}>
      <div className={classes.headerPolls}>
        <Typography variant="h1">Polls</Typography>
        <FormControl className={classes.formControl}>
          <Select
            labelId="polls-status"
            id="polls-status"
            value={status}
            onChange={handleChange}
          >
            {filters.map((status) => (
              <MenuItem key={getStatusIdent(status)} value={status}>
                {t(getStatusIdent(status))}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className={classes.cards}>
        {activePolls.map((poll) => {
          return <PollCard key={poll.id} poll={poll} />
        })}
      </div>
    </div>
  )
}
