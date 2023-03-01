import { ContractAsset } from "../../../common/assets/contractAsset"

export interface SimulationPayload {
  return_amount: string
  commission_amount: string
  spread_amount: string
}

export const simulation = (toAsset: ContractAsset) => ({
  simulation: {
    offer_asset: toAsset,
  },
})
