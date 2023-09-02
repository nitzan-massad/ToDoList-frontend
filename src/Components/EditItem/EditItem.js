import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import { useHtppClient } from '../../shared/hooks/http-hook'
import { Button } from '@mui/material'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import ErrorModal from '../ErrorModal/ErrorModal'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import './EditItem.css'

const EditItem = props => {
  const { isLoading, error, sendRequest, clearError } = useHtppClient()
  const [newItemTitle, setNewItemTitle] = useState()

  const handleEditItemTitle = async () => {
    try {
      const newItem = await sendRequest(
        `/item/edit-item-title`,
        'PATCH',
        {
          itemId: props?.item.id,
          newItemTitle: newItemTitle
        },
        {
          'Content-Type': 'application/json'
        },
        false
      )
      props.handleItemModify(newItem.itemResponse)
      props?.closeModal()
    } catch (err) {}
  }
  const handleDeleteItem = async () => {
    try {
      await sendRequest(`/item/delete-item/${props?.item.id}`, 'DELETE')
      props.handleItemDelete(props?.item)
      props?.closeModal()
    } catch (err) {}
  }
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) { // Check if Enter key is pressed (key code 13)
      e.preventDefault(); // Prevent the default form submission behavior
      handleEditItemTitle();
    }
  };


  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <Stack direction='row' spacing={2}>
        <TextField
          label='Item Title'
          id='outlined-size-normal'
          defaultValue={props?.item.itemTitle}
          helperText='You can change the item name here'
          onChange={e => setNewItemTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className='edit-item-delete-button'>
          <IconButton aria-label='delete' onClick={handleDeleteItem}>
            <DeleteIcon />
          </IconButton>
        </div>
      </Stack>
      <Stack direction='column' spacing={-1}>
        <p id='child-modal-description'>
          {'Creation Date: '}
          <span style={{ fontWeight: 'bold' }}>{new  Date(props?.item.creationDate).toDateString()}</span>
        </p>
        <p id='child-modal-description'>
          {'Completed: '}
          <span style={{ fontWeight: 'bold' }}>{props?.item.isDone.toString()}</span>
        </p>
      </Stack>
      <div className='fotter-edit-item-bts'>
        <Button onClick={handleEditItemTitle}>Change</Button>
        <Button onClick={props?.closeModal}>Discard</Button>
      </div>
    </React.Fragment>
  )
}

export default EditItem
