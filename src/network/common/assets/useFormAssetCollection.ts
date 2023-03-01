import { useEffect, useState } from "react"

import { assetCollection } from "../../constants/assetCollection"
import { AssetGroupType } from "./assetGroup"
import AssetGroup from "./assetGroup"
import Amount from "../amount"

export interface UseFormAssetCollectionProps {
  assetGroup: AssetGroup
  firstType?: AssetGroupType
  secondType?: AssetGroupType
}

export interface UseFormAssetGroupReturn {
  assetIndex: number
  setAssetIndex: React.Dispatch<React.SetStateAction<number>>
  firstAssetId: string
  firstAmount: Amount | undefined
  setFirstAmount: React.Dispatch<React.SetStateAction<Amount | undefined>>
  secondAssetId: string
  secondAmount: Amount | undefined
  setSecondAmount: React.Dispatch<React.SetStateAction<Amount | undefined>>
  setSecondaryAmount: React.Dispatch<React.SetStateAction<Amount | undefined>>
  assetGroup: AssetGroup
}

export function useFormAssetCollection(props: UseFormAssetCollectionProps) {
  const firstType = props.firstType ?? AssetGroupType.primary
  const secondType =
    props.secondType ?? props.firstType === AssetGroupType.primary
      ? AssetGroupType.secondary
      : AssetGroupType.primary

  const [isFirstAssetPrimary, setIsFirstAssetPrimary] = useState(true)
  const setFirstAssetPrimary = () => setIsFirstAssetPrimary(true)
  const setSecondAssetPrimary = () => setIsFirstAssetPrimary(false)

  const useFormAssetGroup = (): UseFormAssetGroupReturn => {
    const [assetGroup, setAssetGroup] = useState(props.assetGroup)
    const [assetIndex, setAssetIndex] = useState(
      assetCollection.getIndex(assetGroup)
    )
    const [firstAmount, setFirstAmount] = useState<Amount>()
    const [secondAmount, setSecondAmount] = useState<Amount>()

    useEffect(() => {
      const primaryType = isFirstAssetPrimary ? firstType : secondType
      const secondaryType = isFirstAssetPrimary ? secondType : firstType
      const primaryAmount = isFirstAssetPrimary ? firstAmount : secondAmount
      const secondaryAmount = isFirstAssetPrimary ? secondAmount : firstAmount

      const assetGroup = new FormAssetGroup(
        assetCollection.getGroup(assetIndex),
        primaryType,
        secondaryType
      )
      assetGroup.primaryAsset.amount = primaryAmount ?? new Amount(0)
      assetGroup.secondaryAsset.amount = secondaryAmount ?? new Amount(0)
      setAssetGroup(assetGroup)
    }, [assetIndex, firstAmount, secondAmount])

    return {
      assetIndex,
      setAssetIndex,
      firstAssetId: assetGroup.asset(firstType).id,
      firstAmount,
      setFirstAmount,
      secondAssetId: assetGroup.asset(secondType).id,
      secondAmount,
      setSecondAmount,
      setSecondaryAmount: isFirstAssetPrimary
        ? setSecondAmount
        : setFirstAmount,
      assetGroup,
    }
  }

  const assets = (assetType: AssetGroupType) => {
    switch (assetType) {
      case AssetGroupType.primary:
        return assetCollection.primaryAssets
      case AssetGroupType.secondary:
        return assetCollection.secondaryAssets
      case AssetGroupType.lp:
        return assetCollection.lpAssets
    }
  }

  return {
    useFormAssetGroup,
    isFirstAssetPrimary,
    setFirstAssetPrimary,
    setSecondAssetPrimary,
    firstAssets: assets(firstType),
    secondAssets: assets(secondType),
  }
}

class FormAssetGroup extends AssetGroup {
  private primaryType: AssetGroupType
  private secondaryType: AssetGroupType

  constructor(
    assetGroup: AssetGroup,
    primaryType: AssetGroupType,
    secondaryType: AssetGroupType
  ) {
    super(assetGroup.tokenContractGroup)
    this.primaryType = primaryType
    this.secondaryType = secondaryType
  }

  get primaryAsset() {
    return this.asset(this.primaryType)
  }

  get secondaryAsset() {
    return this.asset(this.secondaryType)
  }
}
