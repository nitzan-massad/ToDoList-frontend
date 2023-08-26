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

const ItemView = props => {
  const [open, setOpen] = React.useState(false)
  const [modalItem, setModalItem] = React.useState({})
  const matches = useMediaQuery('(min-width: 768px)')
  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box
          sx={{
            pt: 2,
            px: 4,
            pb: 3,
            boxShadow: 24,
            border: '2px solid #000',
            bgcolor: 'background.paper',
            width: matches ? '30%' : '75%',
            height: matches ? '30%' : '35%',
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%',
            position: 'absolute'
          }}
        >
          <EditItem
            item={modalItem}
            handleItemModify={props.handleItemModify}
            handleItemDelete={props.handleItemDelete}
            closeModal={() => setOpen(false)}
          />
        </Box>
      </Modal>
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
