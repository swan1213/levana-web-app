import { useContext } from "react"
import { useWallet, WalletStatus } from "@terra-money/wallet-provider"

import HeaderButton from "./HeaderButton"
import { useConnect } from "../Connect/useConnect"

export interface HeaderConnectButtonProps {
  hideDisconnect?: boolean
}

export default function HeaderConnectButton(props: HeaderConnectButtonProps) {
  const { hideDisconnect } = props
  const { status } = useWallet()
  const { current } = useConnect()

  if (
    !current ||
    (status === WalletStatus.WALLET_CONNECTED && hideDisconnect)
  ) {
    return null
  }

  return (
    <HeaderButton variant="text" onClick={current.onClick}>
      {current.title}
    </HeaderButton>
  )
}
