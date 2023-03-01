import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"

import { useHeaderPages } from "./useHeaderPages"
import { useConnect } from "../Connect/useConnect"
import ThemePicker from "../common/ThemePicker"

export interface HeaderMenuProps {
  onClose: (event: React.KeyboardEvent | React.MouseEvent) => void
}

export default function HeaderMenu(props: HeaderMenuProps) {
  const { onClose } = props
  const { pages } = useHeaderPages()
  const { current } = useConnect()

  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={(event) => onClose(event)}
      onKeyDown={(event) => onClose(event)}
    >
      <List>
        {pages.map((page, index) => (
          <ListItem button key={index}>
            <ListItemText primary={page.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem>
          <ThemePicker />
        </ListItem>
        {current && (
          <ListItem button onClick={current.onClick}>
            <ListItemText primary={current.title} />
          </ListItem>
        )}
      </List>
    </Box>
  )
}
