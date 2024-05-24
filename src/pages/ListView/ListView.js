import React, { useState,useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import TextField from '@mui/material/TextField'

import ColorPicker from '../../Components/ColorPicker/ColorPicker'
import Button from '../../Components/FormElements/Button'
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner'
import ErrorModal from '../../Components/ErrorModal/ErrorModal'
import Modal from '../../Components/Modal/Modal'
import ItemsView from './ItemList/ItemsView'
import AddItemBox from './AddItemBox/AddItemBox'
import { useItemView } from '../../shared/hooks/ItemView-hook'
import ListViewMenu from './ListViewMenu/ListViewMenu'
import ModalVersionTwo from '../../Components/Modal/ModalVersionTwo/ModalVersionTwo'

import './ListView.css'

const ListView = () => {
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    if (!location.state || !location.state.data) {
      history.push('/')
    }
  }, [location, history])

  const { data } = location?.state || {}
  const [openColorPickerModal, setOpenColorPickerModal] = useState(false)
  const [openSharePickerModal, setOpenSharePickerModal] = useState(false)
  

  const {
    handleListColorChange,
    handleAddItemToList,
    handleDeleteList,
    clearError,
    handleItemCheckOrUncheck,
    setShowConfirmModal,
    handleItemModify,
    handleItemDelete,
    handlePositionChange,
    listData,
    listColor,
    isLoading,
    error,
    showConfirmModal,
    addNewItemTextRef
  } = useItemView(data?.listColor , data?.items || [], data?.listId)

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true)
  }

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false)
  }
  function copyUrlOfListToClipBoard () {
    var copyText = document.getElementById('share-list-textblock')
    copyText.select()
    copyText.setSelectionRange(0, 99999)
    navigator.clipboard.writeText(copyText.value)
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
      <Modal
        show={openSharePickerModal}
        onCancel={() => setOpenSharePickerModal(false)}
        header='Share List'
        footerClass='place-item__modal-actions'
        footer={
          <React.Fragment>
            <Button danger onClick={copyUrlOfListToClipBoard}>
              Copy Link
            </Button>
          </React.Fragment>
        }
      >
        <div style={{ textAlignLast: 'center' }}>
          <TextField
            disabled
            id='share-list-textblock'
            label={data?.listTitle}
            multiline
            defaultValue='https://'
            maxRows={1}
          />
        </div>
      </Modal>
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
          <ItemsView
            itemList={listData.items}
            handleCheckUncheck={handleItemCheckOrUncheck}
            handleItemModify={handleItemModify}
            handleItemDelete={handleItemDelete}
            handlePositionChange={handlePositionChange}
          />
        </div>
        <ListViewMenu
          showDeleteWarningHandler={showDeleteWarningHandler}
          listColor={listColor}
          setOpenSharePickerModal={() => setOpenSharePickerModal(true)}
          setOpenColorPickerModal={() => {
            setOpenColorPickerModal(true)
          }}
        />
      </div>
    </React.Fragment>
  )
}

export default ListView
