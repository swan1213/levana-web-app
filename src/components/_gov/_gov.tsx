import type { GetStaticProps } from "next"
import Gov from "./Gov"
import { defaultStaticProps } from "../../utils/defaultStaticProps"

export const getStaticProps: GetStaticProps = async (context) =>
  defaultStaticProps(context)

export default Gov
