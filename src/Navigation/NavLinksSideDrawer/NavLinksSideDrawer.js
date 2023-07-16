import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import LogoutIcon from '@mui/icons-material/Logout'
import CottageIcon from '@mui/icons-material/Cottage'
import InfoIcon from '@mui/icons-material/Info'
import Inventory2Icon from '@mui/icons-material/Inventory2'

import { AuthContext } from '../../shared/context/AuthContext'
import './NavLinksSideDrawer.css'

const NavLinks = props => {
  const auth = useContext(AuthContext)

  const sideDrwarContent = [
    { name: 'All Lists', link: '/', icon: <CottageIcon /> },
    { name: 'Archive', link: '/', icon: <Inventory2Icon /> }
  ]

  return (
    <Box
      sx={{ width: 250 }}
      role='presentation'
      onClick={props?.toggleDrawer(false)}
      onKeyDown={props?.toggleDrawer(false)}
    >
      <List>
        {sideDrwarContent.map(content => (
          <NavLink
            to={content.link}
            exact
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ListItem key={content.name} disablePadding>
              <ListItemButton>
                <ListItemIcon>{content.icon}</ListItemIcon>
                <ListItemText primary={content.name} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider />
      <List>
        {['About'].map(text => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {auth.isLoggedIn && (<div className='log-out-nav-link-side-drawer__btn'>
        <ListItem disablePadding>
          <ListItemButton onClick={auth.logout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={'LogOut'} />
          </ListItemButton>
        </ListItem>
      </div>)}
    </Box>
  )
}

export default NavLinks
