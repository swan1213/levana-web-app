import DialogTitle from "@mui/material/DialogTitle"
import Dialog from "@mui/material/Dialog"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { useWallet, ConnectType } from "@terra-money/wallet-provider"
import { Fragment } from "react"

import TerraExtensionIcon from "../../icons/TerraExtensionIcon"
import TerraMobileIcon from "../../icons/TerraMobileIcon"
import { useTranslations } from "../../utils/useTranslations"
import { useConnect } from "./useConnect"

interface ButtonInfo {
  title: string
  icon: JSX.Element
  onClick: () => void
}

export default function ConnectDialog() {
  const { availableInstallTypes, availableConnectTypes } = useWallet()
  const { dismiss, open, install, connect } = useConnect()
  const t = useTranslations()

  const installExtensionInfo = (): ButtonInfo | null => {
    if (availableInstallTypes.includes(ConnectType.EXTENSION)) {
      return {
        title: t("wallet.options.extension.title"),
        icon: <TerraExtensionIcon />,
        onClick: () => install(ConnectType.EXTENSION),
      }
    }

    return null
  }

  const connectExtensionInfo = (): ButtonInfo | null => {
    const connectTypes = [ConnectType.EXTENSION]

    for (const connectType of connectTypes) {
      if (availableConnectTypes.includes(connectType)) {
        return {
          title: t("wallet.options.extension.title"),
          icon: <TerraExtensionIcon />,
          onClick: () => connect(connectType),
        }
      }
    }

    return null
  }

  const connectMobileInfo = (): ButtonInfo | null => {
    if (availableConnectTypes.includes(ConnectType.WALLETCONNECT)) {
      return {
        title: t("wallet.options.walletConnect.title"),
        icon: <TerraMobileIcon />,
        onClick: () => connect(ConnectType.WALLETCONNECT),
      }
    }

    return null
  }

  return (
    <Dialog onClose={dismiss} open={open}>
      <DialogTitle>{t("wallet.dialog.title")}</DialogTitle>
      <List>
        {[
          installExtensionInfo(),
          connectExtensionInfo(),
          connectMobileInfo(),
        ].map((info, index) =>
          info ? (
            <ListItem key={index} button onClick={info.onClick}>
              <ListItemIcon>{info.icon}</ListItemIcon>
              <ListItemText primary={info.title} />
            </ListItem>
          ) : (
            <Fragment key={index}></Fragment>
          )
        )}
      </List>
    </Dialog>
  )
}
