import { WalletControllerChainOptions } from "@terra-money/wallet-provider"
import { AppProps as NextAppProps } from "next/app"
import { IntlMessages } from "next-intl"
import { PropsWithChildren } from "react"

import { NetworkProvider } from "../network"
import EssentialsProvider from "../components/EssentialsProvider"
import ConnectDialog from "../components/Connect/ConnectDialog"

type AppPageProps = PropsWithChildren<WalletControllerChainOptions> & {
  messages: IntlMessages
  statusCode?: number
}

type AppProps = Omit<NextAppProps, "pageProps"> & {
  pageProps: AppPageProps
}

export default function App(props: AppProps) {
  const { Component, pageProps } = props
  const { messages, defaultNetwork, walletConnectChainIds } = pageProps

  return (
    <NetworkProvider
      defaultNetwork={defaultNetwork}
      walletConnectChainIds={walletConnectChainIds}
    >
      <EssentialsProvider messages={messages}>
        <Component {...pageProps} />
        <ConnectDialog />
      </EssentialsProvider>
    </NetworkProvider>
  )
}
