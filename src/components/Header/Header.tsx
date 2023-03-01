import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import Link from "@mui/material/Link"
import Toolbar from "@mui/material/Toolbar"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import MenuIcon from "@mui/icons-material/Menu"
import NextLink from "next/link"
import { useState } from "react"

import LevanaIcon from "../../icons/LevanaIcon"
import LevanaLogo from "../../icons/LevanaLogo"
import HeaderNav from "./HeaderNav"
import HeaderMenu from "./HeaderMenu"
import ThemePicker from "../common/ThemePicker"
import HeaderConnectButton from "./HeaderConnectButton"
import { useHeaderPages } from "./useHeaderPages"

export default function Header() {
  const { home } = useHeaderPages()
  const theme = useTheme()
  const displayNav = useMediaQuery(theme.breakpoints.up("md"))
  const [open, setOpen] = useState(false)

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      const keyboardEvent = event as React.KeyboardEvent

      if (
        event.type === "keydown" &&
        (keyboardEvent.key === "Tab" || keyboardEvent.key === "Shift")
      ) {
        return
      }

      setOpen(open)
    }

  return (
    <Container maxWidth="lg" disableGutters sx={{ mb: 2 }}>
      <Toolbar>
        <NextLink href={home.path} passHref>
          <Link sx={{ display: "flex", alignItems: "center" }}>
            <LevanaIcon sx={{ fontSize: 30, mr: 1.5 }} />
            <LevanaLogo />
          </Link>
        </NextLink>
        {displayNav ? (
          <>
            <HeaderNav />
            <Box sx={{ flexGrow: 1 }} />
            <ThemePicker sx={{ mr: 3 }} />
            <HeaderConnectButton />
          </>
        ) : (
          <>
            <Box sx={{ flexGrow: 1 }} />
            <HeaderConnectButton hideDisconnect />
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
              <HeaderMenu onClose={toggleDrawer(false)} />
            </Drawer>
          </>
        )}
      </Toolbar>
    </Container>
  )
}
