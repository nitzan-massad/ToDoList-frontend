import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import MailIcon from '@mui/icons-material/Mail'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import { AuthContext } from '../../shared/context/AuthContext'
import './NavLinksSideDrawer.css'

const NavLinks = props => {
  const auth = useContext(AuthContext)

  const sideDrwarContent = [{ name: 'All Lists', link: '/' }]

  return (
    <Box
      sx={{ width: 250 }}
      role='presentation'
      onClick={props?.toggleDrawer(false)}
      onKeyDown={props?.toggleDrawer(false)}
    >
      <List>
        {sideDrwarContent.map((content, index) => (
          <ListItem key={content.name} disablePadding>
            <NavLink to={content.link} exact>
              <ListItemButton>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText primary={content.name} />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Logout'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={auth.logout}>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

}

export default NavLinks
