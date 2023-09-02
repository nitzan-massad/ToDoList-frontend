import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

import ColorPicker from '../../Components/ColorPicker/ColorPicker'
import Button from '../../Components/FormElements/Button'
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner'
import ErrorModal from '../../Components/ErrorModal/ErrorModal'
import Modal from '../../Components/Modal/Modal'
import ItemView from './ItemList/ItemView'
import AddItemBox from './AddItemBox/AddItemBox'
import { useItemView } from '../../shared/hooks/ItemView-hook'
import ListViewMenu from './ListViewMenu/ListViewMenu'
import ModalVersionTwo from '../../Components/Modal/ModalVersionTwo/ModalVersionTwo'

import './ListView.css'

const ListView = () => {
  const location = useLocation()
  const { data } = location.state
  const [openColorPickerModal, setOpenColorPickerModal] = useState(false)
  const {
    handleListColorChange,
    handleAddItemToList,
    handleDeleteList,
    clearError,
    handleItemCheckOrUncheck,
    setShowConfirmModal,
    handleItemModify,
    handleItemDelete,
    listData,
    listColor,
    isLoading,
    error,
    showConfirmModal,
    addNewItemTextRef
  } = useItemView(data.listColor, data?.items, data?.listId)

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
      <ModalVersionTwo
        open={openColorPickerModal}
        onClose={() => {
          setOpenColorPickerModal(false)
        }}
      >
        <ColorPicker
          pickedAction={handleListColorChange}
          initialColorChoice={listColor}
        />
      </ModalVersionTwo>
      <ErrorModal error={error} onClear={clearError} />
      <div id='list-view-div' className='list-view-main-div'>
        {isLoading && <LoadingSpinner asOverlay />}
        <div className='list-view-list-content-div'>
          <h1 className='list-view-list-name__h1'>{data?.listTitle}</h1>
          <div className='list-view-top-bar__div'>
            <AddItemBox
              HandleAddItem={handleAddItemToList}
              textRef={addNewItemTextRef}
            />
          </div>
          <ItemView
            itemList={listData.items}
            handleCheckUncheck={handleItemCheckOrUncheck}
            handleItemModify={handleItemModify}
            handleItemDelete={handleItemDelete}
          />
        </div>
        <ListViewMenu
          showDeleteWarningHandler={showDeleteWarningHandler}
          listColor={listColor}
          setOpenColorPickerModal={()=>{setOpenColorPickerModal(true)}}
        />
      </div>
    </React.Fragment>
  )
}

export default ListView
