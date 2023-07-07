import React, { useState, useReducer, useRef } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

import ColorPicker from '../../Components/ColorPicker/ColorPicker'
import Button from '../../Components/FormElements/Button'
import { useHtppClient } from '../../shared/hooks/http-hook'
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner'
import ErrorModal from '../../Components/ErrorModal/ErrorModal'
import Modal from '../../Components/Modal/Modal'
import ItemView from './ItemList/ItemView'
import AddItemBox from './AddItemBox/AddItemBox'
import './ListView.css'

const itemListReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      console.log('hadas is the queen:' + JSON.stringify(action.newItem))
      return {
        ...state,
        items: [action.newItem].concat(state.items)
      }
    case 'CHECK-UNCHECK-ITEM':
      const itemsToUpdate = state.items
      const currentIndex2 = itemsToUpdate.findIndex(
        item => item.id == action.itemId
      )
      itemsToUpdate[currentIndex2].isDone = action.valueToUpdate
      return {
        ...state,
        items: itemsToUpdate
      }
    default:
      throw new Error()
  }
}

const ListView = () => {
  const location = useLocation()
  const { data } = location.state
  const [listColor, setListColor] = useState(data.listColor)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const { isLoading, error, sendRequest, clearError } = useHtppClient()
  const history = useHistory()
  const addNewItemTextRef = useRef('')

  const [listData, dispatchListData] = useReducer(itemListReducer, {
    items: data.items?.sort(
      (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
    )
  })

  if (listColor !== data.listColor) {
    setListColor(data.listColor)
  }

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true)
  }

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false)
  }

  const handleListColorChange = async newColor => {
    setListColor(newColor)
    try {
      await sendRequest(
        `/update-list-color/${data?.listId}`,
        'PATCH',
        {
          color: newColor
        },
        {
          'Content-Type': 'application/json'
        }
      )
    } catch (err) {}
  }
  const handleDeleteList = async () => {
    setShowConfirmModal(false)
    try {
      await sendRequest(`/delete-list/${data?.listId}`, 'DELETE')
      history.push('/')
    } catch (err) {}
  }
  const handleAddItemToList = async () => {
    try {
      const responseData = await sendRequest(
        `/add-item-to-list`,
        'POST',
        {
          itemTitle: addNewItemTextRef.current.value,
          listId: data.listId
        },
        {
          'Content-Type': 'application/json'
        }
      )
      dispatchListData({
        type: 'ADD_ITEM',
        newItem: responseData.newItemResponse
      })
      addNewItemTextRef.current.value = ''
    } catch (err) {}
  }

  const handleItemCheckOrUncheck = async item => {
    try {
      const valueToUpdate = !item.isDone
      dispatchListData({
        type: 'CHECK-UNCHECK-ITEM',
        itemId: item.id,
        valueToUpdate: valueToUpdate
      })
      const responseData = await sendRequest(
        `/item-check-uncheck`,
        'PATCH',
        {
          itemId: item.id,
          checkUncheckBool: valueToUpdate
        },
        {
          'Content-Type': 'application/json'
        },
        false
      )
    } catch (err) {}
  }

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header='Are you sure?'
        footerClass='place-item__modal-actions'
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={handleDeleteList}>
              DELETE
            </Button>
          </React.Fragment>
        }
      ></Modal>
      <ErrorModal error={error} onClear={clearError} />
      <div>
        {isLoading && <LoadingSpinner asOverlay />}
        <h1 className='list-view-list-name__h1'>{data?.listTitle}</h1>
        <div className='list-view-top-bar__div'>
          <div className='delete-btn__list-view'>
            <ColorPicker
              pickedAction={handleListColorChange}
              initialColorChoice={listColor}
            />
            <IconButton aria-label='delete' onClick={showDeleteWarningHandler}>
              <DeleteIcon />
            </IconButton>
          </div>
          <div>
            <AddItemBox
              HandleAddItem={handleAddItemToList}
              textRef={addNewItemTextRef}
            />
          </div>
        </div>
        <ItemView
          itemList={listData.items}
          handleCheckUncheck={handleItemCheckOrUncheck}
        ></ItemView>
      </div>
    </React.Fragment>
  )
}

export default ListView
