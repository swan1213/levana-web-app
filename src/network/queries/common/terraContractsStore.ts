import { gql } from "@apollo/client"

export interface TerraContractsStorePayload<T> {
  contract: {
    queryResult: T
  }
}

export const terraContractsStore = gql`
  query TerraContractsStore($address: String!, $message: String!)
  @api(name: "levana") {
    contract: terraContractsStore(address: $address, message: $message) {
      queryResult
    }
  }
`
