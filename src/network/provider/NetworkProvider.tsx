import { ApolloProvider } from "@apollo/client"
import {
  StaticWalletProvider,
  WalletProvider,
  WalletControllerChainOptions,
} from "@terra-money/wallet-provider"
import { PropsWithChildren } from "react"
import { RecoilRoot } from "recoil"

import { useApolloClient } from "../clients/apolloClient"
import useSyncNetwork from "./useSyncNetwork"
import useSyncWalletAddress from "./useSyncWalletAddress"
import { defaultTerraNetwork } from "../constants/networks"

export type WalletControllerProps =
  PropsWithChildren<WalletControllerChainOptions>

export default function NetworkProvider(props: WalletControllerProps) {
  const { defaultNetwork, walletConnectChainIds, children } = props

  return (
    <RecoilRoot>
      <WalletController
        defaultNetwork={defaultNetwork}
        walletConnectChainIds={walletConnectChainIds}
      >
        <NetworkController>{children}</NetworkController>
      </WalletController>
    </RecoilRoot>
  )
}

function WalletController(props: WalletControllerProps) {
  const { defaultNetwork, walletConnectChainIds, children } = props
  const networkInfos = Object.values(walletConnectChainIds)

  const chainOptions: WalletControllerChainOptions = {
    walletConnectChainIds,
    defaultNetwork: defaultTerraNetwork(networkInfos) ?? defaultNetwork,
  }

  return (
    <>
      {typeof window !== "undefined" ? (
        <WalletProvider {...chainOptions}>{children}</WalletProvider>
      ) : (
        <StaticWalletProvider {...chainOptions}>
          {children}
        </StaticWalletProvider>
      )}
    </>
  )
}

function NetworkController(props: PropsWithChildren<unknown>) {
  const { children } = props
  const apolloClient = useApolloClient()

  useSyncNetwork()
  useSyncWalletAddress()

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}
