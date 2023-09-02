import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Checkbox from '@mui/material/Checkbox'
import ViewStreamIcon from '@mui/icons-material/ViewStream'
import Modal from '@mui/material/Modal'
import EditItem from '../../../Components/EditItem/EditItem'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import ModalVersionTwo from '../../../Components/Modal/ModalVersionTwo/ModalVersionTwo'

const ItemView = props => {
  const [open, setOpen] = React.useState(false)
  const [modalItem, setModalItem] = React.useState({})
  const matches = useMediaQuery('(min-width: 768px)')
  return (
    <React.Fragment>
      <ModalVersionTwo
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        <EditItem
          item={modalItem}
          handleItemModify={props.handleItemModify}
          handleItemDelete={props.handleItemDelete}
          closeModal={() => setOpen(false)}
        />
      </ModalVersionTwo>
      <div className='list-of-items-inside-listview__div'>
        <List
          dense
          sx={{ width: '100%', maxWidth: '80%', bgcolor: 'background.paper' }}
        >
          {props.itemList?.map(item => {
            return (
              <ListItem
                key={item?.id}
                secondaryAction={
                  <Checkbox
                    edge='end'
                    onChange={() => {
                      props.handleCheckUncheck(item)
                    }}
                    checked={item.isDone}
                  />
                }
                disablePadding
              >
                <ListItemButton
                  onClick={() => {
                    setOpen(true)
                    setModalItem(item)
                  }}
                >
                  <ListItemAvatar>
                    <ViewStreamIcon />
                  </ListItemAvatar>
                  <ListItemText primary={`${item.itemTitle}`} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </div>
    </React.Fragment>
  )
}

export default ItemView
