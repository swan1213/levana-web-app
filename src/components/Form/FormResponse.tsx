import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import Section, { SectionProps } from "../common/Section/Section"
import FormResponseHash from "./FormResponseHash"
import FormButton from "./FormButton"
import { useTranslations } from "../../utils/useTranslations"
import { FormResultProps } from "./types"
import { TransactionResponseState } from "../../network/transactions/common/types"
import { NetworkErrorKey } from "../../network/errors/networkError"

export type FormResponseProps = SectionProps & FormResultProps

export default function FormResponse(props: FormResponseProps) {
  const { result, onDismiss, ...muiProps } = props
  const { response, error } = result
  const t = useTranslations()

  if (!response && !error) {
    return null
  }

  const stateTitle = (state: TransactionResponseState) => {
    switch (state) {
      case TransactionResponseState.loading:
        return t("form.response.loading.title")
      case TransactionResponseState.success:
        return t("form.response.success.title")
      case TransactionResponseState.failure:
        return t("form.response.failure.title")
    }
  }

  const errorMessage = (error: Error) => {
    switch (error.name) {
      case NetworkErrorKey.transactionFailed:
        return t("error.levana.transaction")
      case NetworkErrorKey.queryFailed:
        return error.message
      default:
        console.warn(error)
        return error.name
    }
  }

  return (
    <Section
      {...muiProps}
      bgAlpha={0.8}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "100%", textAlign: "center" }}>
          {response && (
            <>
              <Typography variant="subtitle1">
                {stateTitle(response.state)}
              </Typography>
              <FormResponseHash
                hash={response.hash}
                variant="body2"
                sx={{
                  mt: 1,
                  display: "block",
                  opacity: 0.6,
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  color: "inherit",
                }}
              />
            </>
          )}
          {error && <>{errorMessage(error)}</>}
        </Box>
      </Box>
      <FormButton
        loading={response?.state === TransactionResponseState.loading}
        onClick={onDismiss}
      >
        {t("generic.dismiss")}
      </FormButton>
    </Section>
  )
}
