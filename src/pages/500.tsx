import { NextPage, GetStaticProps } from "next/types"

import Header from "../components/Header/Header"
import { defaultStaticProps } from "../utils/defaultStaticProps"

const Error: NextPage = () => {
  return (
    <>
      <Header />
      500 - internal server error
    </>
  )
}

export const getStaticProps: GetStaticProps = defaultStaticProps

export default Error
