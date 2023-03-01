import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { MultiAPILink } from "@habx/apollo-multi-endpoint-link"

import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"

import { defaultNetwork } from "../constants/networks"
import { networkState } from "../states/network"

export interface GraphClients {
  levana: string
  mantel: string
}

const createLink = (graphClients: GraphClients) => {
  return new MultiAPILink({
    endpoints: { ...graphClients },
    createHttpLink,
  })
}

export const apolloClient = new ApolloClient({
  link: createLink({
    levana: defaultNetwork.levana,
    mantel: defaultNetwork.mantel,
  }),
  cache: new InMemoryCache(),
})

export const useApolloClient = () => {
  const { levana, mantel } = useRecoilValue(networkState)
  const [client, setApolloClient] = useState(apolloClient)

  useEffect(() => {
    apolloClient.setLink(createLink({ levana, mantel }))
    setApolloClient(apolloClient)
  }, [levana, mantel])

  return client
}
