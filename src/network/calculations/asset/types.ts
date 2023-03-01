import { Asset } from "../.."

export interface UseSimulationProps {
  offerPoolAsset?: Asset
  askPoolAsset?: Asset
  offerAmount?: string
}

export interface UseSimulationReturn {
  baseAsset: Asset
  askAsset: Asset
  feeAsset?: Asset
}

export interface UseSimulation {
  (props: UseSimulationProps): UseSimulationReturn | undefined
}
