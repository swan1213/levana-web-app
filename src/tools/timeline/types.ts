import { PriceIndexQueries } from "../../network/queries/priceIndex/usePriceIndex"

export type TimelineUnit = "d1" | "w1" | "m1" | "y1"

export type TimelinePriceIndexProps = Omit<PriceIndexQueries, "assetId">
