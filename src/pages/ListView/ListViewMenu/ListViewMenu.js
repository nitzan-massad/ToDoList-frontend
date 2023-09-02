import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Fade from '@mui/material/Fade'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import DeleteIcon from '@mui/icons-material/Delete'
import './ListViewMenu.css'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import CircleIcon from '@mui/icons-material/Circle'

const ListViewMenu = props => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = props => {
    setAnchorEl(null)
  }
  const handleColorChangeClick = () => {
    props?.setOpenColorPickerModal()
    handleClose()
  }

  const onDeleteListButton = () => {
    handleClose()
    props.showDeleteWarningHandler()
  }
  return (
    <div className='list-view-menu'>
      <Button
        id='fade-button'
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </Button>
      <Menu
        id='fade-menu'
        MenuListProps={{
          'aria-labelledby': 'fade-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={onDeleteListButton}>
          <ListItemIcon>
            <DeleteIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Delete List</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleColorChangeClick}>
          <ListItemIcon>
            <CircleIcon
              className='list-item-color-circle'
              fontSize='small'
              style={{
                color: props.listColor === 'None' ? 'white' : props.listColor
              }}
            />
          </ListItemIcon>
          <ListItemText>List Color</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default ListViewMenu
