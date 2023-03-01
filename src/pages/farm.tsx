import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import { NextPage, GetStaticProps } from "next/types"

import Header from "../components/Header/Header"
import FarmPools from "../components/Farm/Pools/FarmPools"
import FarmForm from "../components/Farm/Form/FarmForm"
import { defaultStaticProps } from "../utils/defaultStaticProps"
import { useTranslations } from "../utils/useTranslations"
import { useHashRoute } from "../routes/useHashRoute"
import { farmRouteMap } from "../routes/farm"

const Farm: NextPage = () => {
  const hashProps = useHashRoute(farmRouteMap.decode)
  const t = useTranslations()

  if (hashProps) {
    return (
      <>
        <Header />
        <Container maxWidth="sm">
          <Typography variant="h1" sx={{ mb: 2 }}>
            {t("farm.pool.title")}
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            {t("farm.pool.detail")}
          </Typography>
          <FarmForm {...hashProps} />
        </Container>
      </>
    )
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Typography variant="h1" sx={{ mb: 2 }}>
          {t("farm.main.title")}
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          {t("farm.main.detail")}
        </Typography>
        <FarmPools />
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = defaultStaticProps

export default Farm
