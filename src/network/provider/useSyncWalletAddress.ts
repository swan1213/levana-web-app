import { useConnectedWallet } from "@terra-money/wallet-provider"

import { useEffect } from "react"
import { useSetRecoilState } from "recoil"

import { walletAddressState } from "../states/walletAddress"

export default function useSyncWalletAddress() {
  const wallet = useConnectedWallet()
  const setWalletAddress = useSetRecoilState(walletAddressState)

  useEffect(() => {
    if (wallet) {
      setWalletAddress(wallet.walletAddress)
    } else {
      setWalletAddress(undefined)
    }
  }, [wallet, setWalletAddress])
}
