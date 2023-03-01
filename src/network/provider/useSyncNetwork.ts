import { useWallet } from "@terra-money/wallet-provider"

import { useEffect } from "react"
import { useSetRecoilState } from "recoil"

import { networks, NetworkInfo, Network } from "../constants/networks"
import { networkState } from "../states/network"

export default function useSyncNetwork() {
  const { network } = useWallet()
  const setNetwork = useSetRecoilState(networkState)

  useEffect(() => {
    const syncNetwork = (): NetworkInfo => {
      switch (network.name) {
        case Network.mainnet:
          return Object.assign({}, networks.mainnet, network)

        case Network.testnet:
        default:
          return Object.assign({}, networks.testnet, network)
      }
    }

    setNetwork(syncNetwork())
  }, [network, setNetwork])
}
