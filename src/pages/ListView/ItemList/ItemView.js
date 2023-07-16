import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Checkbox from '@mui/material/Checkbox'
import Avatar from '@mui/material/Avatar'

const ItemView = props => {
  return (
    <div className='list-of-items-inside-listview__div'>
      <List
        dense
        sx={{ width: '100%', maxWidth: '80%', bgcolor: 'background.paper' }}
      >
        {props.itemList?.map(item => {
          return (
            <ListItem
              key={item.id}
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
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${item + 1}`}
                    src={`/static/images/avatar/${item + 1}.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText primary={`${item.itemTitle}`} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}

export default ItemView
