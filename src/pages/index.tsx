import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import { NextPage, GetStaticProps } from "next/types"

import Header from "../components/Header/Header"
import ExchangeForm from "../components/Exchange/Form"
import ExchangeHeader from "../components/Exchange/ExchangeHeader"
import ExchangeChart from "../components/Exchange/Chart"
import { ExchangeProvider } from "../components/Exchange/ExchangeContext"
import { defaultStaticProps } from "../utils/defaultStaticProps"

const Exchange: NextPage = () => {
  return (
    <>
      <Header />
      <ExchangeProvider>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={12} md={4}>
              <ExchangeHeader display={{ xs: "block", md: "none" }} mb={2} />
              <ExchangeForm />
            </Grid>
            <Grid item xs={12} md={8}>
              <ExchangeHeader display={{ xs: "none", md: "block" }} mb={2} />
              <ExchangeChart />
            </Grid>
          </Grid>
        </Container>
      </ExchangeProvider>
    </>
  )
}

export const getStaticProps: GetStaticProps = defaultStaticProps

export default Exchange
