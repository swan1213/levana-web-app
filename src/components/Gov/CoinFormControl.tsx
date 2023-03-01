import { FormControl, FormLabel, Box, Tooltip, TextField } from "@mui/material"
import { InfoOutlined } from "@mui/icons-material"
import makeStyles from "@mui/styles/makeStyles"

import { ReactNode } from "react"
import { Controller } from "react-hook-form"
import { useTranslations as useNextTranslations } from "next-intl"

import DepositIcon from "../../icons/PollIcons/Depositicon"
import Asset from "../../network/common/assets/asset"
// import { useTranslations } from "../utils/useTranslations"

const useStyles = makeStyles({
  textField: {
    "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
      {
        display: "none",
      },
    "& input": {
      "-webkit-box-shadow": "0 0 0 30px #121212 inset !important",
    },
  },
  userBalance: {
    display: "flex",
    alignItems: "center",
  },
})

interface Props {
  name: string
  balance: Asset
  setValue: (value: string) => void
  getError: (key: string, type: string) => ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: any
}

export default function CoinFormControl(props: Props) {
  const { name, balance, setValue, getError, control, errors } = props
  // const t = useTranslations()
  const t = useNextTranslations() // TODO: replace with type defined function above
  const classes = useStyles()

  return (
    <Box>
      <FormControl fullWidth={true}>
        <Box display="flex" justifyContent="space-between" marginBottom={2}>
          <FormLabel htmlFor={name}>
            <Tooltip title={t(name)}>
              <>
                <span>{name.toUpperCase()}</span>
                <InfoOutlined />
              </>
            </Tooltip>
          </FormLabel>
          <div className={classes.userBalance}>
            <DepositIcon />
            <span className={classes.userBalance} style={{ marginLeft: 10 }}>
              {balance.toFormattedAmount()}
            </span>
          </div>
        </Box>

        <Controller
          name={name}
          control={control}
          rules={{
            required: true,
            min: 0,
            max: balance.amount.toDecimal(),
          }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              id={name}
              variant="outlined"
              type="number"
              value={value}
              autoFocus={false}
              helperText={!!errors[name] && getError(name, errors[name].type)}
              onChange={(event) => {
                const nextValue = event.target.value
                onChange(nextValue)
                setValue(nextValue)
              }}
              className={classes.textField}
              error={!!errors[name]}
            />
          )}
        ></Controller>
      </FormControl>
    </Box>
  )
}
