import { BoxProps } from "@mui/material/Box"
import { useRouter } from "next/router"

import { farmRouteMap, FarmRoute, FarmRouteProps } from "../../../routes/farm"
import { useTranslations } from "../../../utils/useTranslations"
import TabToggle from "../../../components/common/TabToggle"

export type FarmFormToggleProps = FarmRouteProps & BoxProps

export default function FarmFormToggle(props: FarmFormToggleProps) {
  const { route, assetGroup, sx } = props
  const { push } = useRouter()
  const t = useTranslations("farm.pool.form")

  const handleTabChange = (
    event: React.MouseEvent<HTMLElement>,
    route: FarmRoute
  ) => {
    push({ hash: farmRouteMap.encode({ route, assetGroup }) })
  }

  return (
    <TabToggle
      value={route}
      onChange={handleTabChange}
      buttons={[
        {
          value: FarmRoute.provide,
          title: t("provide.title"),
        },
        {
          value: FarmRoute.unstake,
          title: t("unstake.title"),
        },
      ]}
      sx={sx}
    />
  )
}
