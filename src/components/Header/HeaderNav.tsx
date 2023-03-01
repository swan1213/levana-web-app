import Stack from "@mui/material/Stack"
import { useRouter } from "next/router"

import HeaderLink from "./HeaderLink"
import { useHeaderPages } from "./useHeaderPages"

export default function HeaderNav() {
  const { pages } = useHeaderPages()
  const { pathname } = useRouter()

  const active = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path)

  return (
    <Stack direction="row" spacing={4} sx={{ ml: 6 }}>
      {pages.map((page, index) => (
        <HeaderLink key={index} page={page} active={active(page.path)} />
      ))}
    </Stack>
  )
}
