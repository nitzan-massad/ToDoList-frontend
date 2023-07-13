import React, { useState, useReducer, useRef } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

import ColorPicker from '../../Components/ColorPicker/ColorPicker'
import Button from '../../Components/FormElements/Button'
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner'
import ErrorModal from '../../Components/ErrorModal/ErrorModal'
import Modal from '../../Components/Modal/Modal'
import ItemView from './ItemList/ItemView'
import AddItemBox from './AddItemBox/AddItemBox'
import { useItemView } from '../../shared/hooks/ItemView-hook'

import './ListView.css'


const ListView = () => {
  const location = useLocation()
  const { data } = location.state
  const history = useHistory()
  const {dispatchListData,
    handleListColorChange,
    handleAddItemToList,
    handleDeleteList,
    clearError,
    handleItemCheckOrUncheck,
    setShowConfirmModal,
    setListColor,
    listData,
    listColor,
    isLoading,
    error,
    showConfirmModal,
    addNewItemTextRef
  } = useItemView(data.listColor,data.items,data?.listId)



  if (listColor !== data.listColor) {
    setListColor(data.listColor)
  }

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true)
  }

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false)
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
      />
      <ErrorModal error={error} onClear={clearError} />
      <div>
        {isLoading && <LoadingSpinner asOverlay />}
        <h1 className='list-view-list-name__h1'>{data?.listTitle}</h1>
        <div className='list-view-top-bar__div'>
          <ColorPicker
            pickedAction={handleListColorChange}
            initialColorChoice={listColor}
          />
          <IconButton aria-label='delete' onClick={showDeleteWarningHandler}>
            <DeleteIcon />
          </IconButton>
          <AddItemBox
            HandleAddItem={handleAddItemToList}
            textRef={addNewItemTextRef}
          />
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