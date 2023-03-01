import { ContractAsset } from "../../../common/assets/contractAsset"

export interface ReverseSimulationPayload {
  offer_amount: string
  commission_amount: string
  spread_amount: string
}

export const reverseSimulation = (toAsset: ContractAsset) => ({
  reverse_simulation: {
    ask_asset: toAsset,
  },
})
