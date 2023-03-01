import { NextPage, GetStaticProps } from "next/types"

import Header from "../components/Header/Header"
import { defaultStaticProps } from "../utils/defaultStaticProps"

const Error: NextPage = () => {
  return (
    <>
      <Header />
      404 - page not found
    </>
  )
}

export const getStaticProps: GetStaticProps = defaultStaticProps

export default Error
