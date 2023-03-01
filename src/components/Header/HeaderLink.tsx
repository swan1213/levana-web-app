import Link from "@mui/material/Link"
import NextLink from "next/link"

import { HeaderPage } from "./useHeaderPages"

export interface HeaderLinkProps {
  page: HeaderPage
  active: boolean
}

export default function HeaderLink(props: HeaderLinkProps) {
  const { page, active } = props

  return (
    <NextLink href={page.path} passHref>
      <Link
        underline="none"
        variant="body2"
        sx={{
          color: ({ palette }) => palette.text.primary,
          borderBottomWidth: active ? 2 : 0,
          borderBottomStyle: "solid",
          borderBottomColor: ({ palette }) => palette.primary.main,
          fontWeight: "bold",
        }}
      >
        {page.title}
      </Link>
    </NextLink>
  )
}
