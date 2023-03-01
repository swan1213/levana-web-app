import { ContractAsset } from "../../../common/assets/contractAsset"

export interface PoolPayload {
  assets: [ContractAsset, ContractAsset]
  total_share: string
}

export const pool = () => ({
  pool: {},
})
