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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'


const ItemsView = props => {
  const [open, setOpen] = React.useState(false)
  const [modalItem, setModalItem] = React.useState({})

  const handleCheckUncheck = item => {
    if (navigator.vibrate && !item.isDone) {
      navigator.vibrate(500)
    }
    props.handleCheckUncheck(item)
  }

  const onDragEnd = result => {
    if (!result.destination) return
    props.handlePositionChange(
      result.draggableId,
      result.source.index,
      result.destination.index
    )
  }

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
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='list'>
              {provided => (
                <React.Fragment>
                <ul ref={provided.innerRef} {...provided.droppableProps}>
                  {props.itemList.map((item, index) => {
                    return (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {provided => (
                          <ListItem
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={item?.id}
                            secondaryAction={
                              <Checkbox
                                edge='end'
                                onChange={() => handleCheckUncheck(item)}
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
                        )}
                      </Draggable>
                    )
                  })}  
                </ul>
                {provided.placeholder}
                </React.Fragment>
              )}
            </Droppable>
          </DragDropContext>
        </List>
      </div>
    </React.Fragment>
  )
}

export default ItemsView
