import {
  getChainOptions,
  WalletControllerChainOptions,
} from "@terra-money/wallet-provider"
import { GetStaticPropsContext } from "next/types"
import { IntlMessages } from "next-intl"

export interface DefaultStaticPropsReturn {
  props: WalletControllerChainOptions & {
    messages: IntlMessages
  }
}

type DefaultStaticProps = (
  context: GetStaticPropsContext
) => Promise<DefaultStaticPropsReturn>

export const defaultStaticProps: DefaultStaticProps = async (context) => {
  const { locale } = context
  const chainOptions = await getChainOptions()

  return {
    props: {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      messages: require(`../locales/${locale}.ts`).default,
      ...chainOptions,
    },
  }
}
