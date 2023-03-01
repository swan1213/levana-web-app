import {
  useWallet,
  WalletStatus,
  ConnectType,
} from "@terra-money/wallet-provider"
import { useMemo } from "react"
import { atom, useRecoilState } from "recoil"

import { useTranslations } from "../../utils/useTranslations"

const connectDialogOpenState = atom({
  key: "ConnectDialogOpen",
  default: false,
})

export function useConnect() {
  const { status, install, connect, disconnect } = useWallet()
  const [open, setOpen] = useRecoilState(connectDialogOpenState)
  const t = useTranslations()

  const controls = useMemo(
    () => ({
      open,
      present: () => setOpen(true),
      dismiss: () => setOpen(false),
      install: (connectType: ConnectType) => {
        setOpen(false)
        install(connectType)
      },
      connect: (connectType: ConnectType) => {
        setOpen(false)
        connect(connectType)
      },
      disconnect,
    }),
    [open, setOpen, install, connect, disconnect]
  )

  const current = useMemo(() => {
    switch (status) {
      case WalletStatus.INITIALIZING:
        return null

      case WalletStatus.WALLET_CONNECTED:
        return {
          title: t("wallet.disconnect.title"),
          onClick: controls.disconnect,
          isConnected: true,
        }

      case WalletStatus.WALLET_NOT_CONNECTED:
        return {
          title: t("wallet.connect.title"),
          onClick: controls.present,
          isConnected: false,
        }
    }
  }, [status, t, controls.disconnect, controls.present])

  return { ...controls, current }
}
