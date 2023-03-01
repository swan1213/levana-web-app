import Link, { LinkProps } from "@mui/material/Link"
import { useRecoilValue } from "recoil"

import { networkState } from "../../network/states/network"

export interface FormResponseHashProps extends LinkProps {
  hash: string
}

export default function FormResponseHash(props: FormResponseHashProps) {
  const { hash, ...muiProps } = props
  const { chainID } = useRecoilValue(networkState)

  return (
    <Link
      {...muiProps}
      href={`https://finder.terra.money/${chainID}/tx/${hash}`}
      target="_blank"
    >
      {hash}
    </Link>
  )
}
