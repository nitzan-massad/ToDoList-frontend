import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Checkbox from '@mui/material/Checkbox'
import ViewStreamIcon from '@mui/icons-material/ViewStream'
import EditItem from '../../../Components/EditItem/EditItem'
import ModalVersionTwo from '../../../Components/Modal/ModalVersionTwo/ModalVersionTwo'

const ItemView = props => {
  const [open, setOpen] = React.useState(false)
  const [modalItem, setModalItem] = React.useState({})
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
