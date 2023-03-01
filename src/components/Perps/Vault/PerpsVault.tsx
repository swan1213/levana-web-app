import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { useConnectedWallet } from "@terra-money/wallet-provider"
import { useState } from "react"

import { useTranslations } from "../../../utils/useTranslations"
import useTheme from "../../../theme/useTheme"
import { useVaultAccount } from "../../../network/queries/perps/vault/useVaultAccount"
import { PerpsVaultDepositForm, PerpsVaultWithdrawForm } from "./PerpsVaultForm"

const spacing = 3

export default function PerpsVault() {
  const [formType, setFormType] = useState<"deposit" | "withdraw">()
  const theme = useTheme()
  const wallet = useConnectedWallet()
  const { accountAsset, refetch } = useVaultAccount()
  const t = useTranslations("perps.trade.leftSidebar")

  const handleDepositForm = () => setFormType("deposit")
  const handleWithdrawForm = () => setFormType("withdraw")
  const handleNoForm = () => {
    refetch()
    setFormType(undefined)
  }

  return (
    <>
      {accountAsset && (
        <Grid alignItems="center" container sx={{ mb: spacing }}>
          <Grid item xs={6}>
            <Typography variant="body2" color={theme.palette.text.secondary}>
              {t("availableBalance")}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography sx={{ textAlign: "right" }}>
              {accountAsset.toNameFormattedAmount()}
            </Typography>
          </Grid>
        </Grid>
      )}

      {wallet && (
        <>
          {formType === "deposit" ? (
            <PerpsVaultDepositForm onCancel={handleNoForm} />
          ) : formType === "withdraw" ? (
            <PerpsVaultWithdrawForm onCancel={handleNoForm} />
          ) : (
            <Grid alignItems="center" columnSpacing={2} container>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  onClick={handleDepositForm}
                  fullWidth
                >
                  {t("deposit")}
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  onClick={handleWithdrawForm}
                  fullWidth
                >
                  {t("withdraw")}
                </Button>
              </Grid>
            </Grid>
          )}
        </>
      )}
    </>
  )
}
