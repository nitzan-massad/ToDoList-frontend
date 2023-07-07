import { useState, useRef, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import { useHtppClient } from './http-hook'
/*
const itemListReducer = (state, action) => {
    console.log('before crashh')
    switch (action.type) {
      case 'ADD_ITEM':
        return {
          ...state,
          items: [action.newItem].concat(state.items)
        }
      default:
        console.log('what the fucckkkk')

    }
  }
*/
export const useItemView = (color, items) => {
  const [listColor, setListColor] = useState(color)
  const { isLoading, error, sendRequest, clearError } = useHtppClient()
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const history = useHistory()
  const addNewItemTextRef = useRef('')
 /* const [listData, dispatchListData] = useReducer(itemListReducer, {
    items: items?.sort(
      (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
    )
  })
*/
  const handleListColorChange = async (newColor, listId) => {
    setListColor(newColor)
    try {
      await sendRequest(
        `/update-list-color/${listId}`,
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
  const handleDeleteList = async listId => {
    setShowConfirmModal(false)
    try {
      await sendRequest(`/delete-list/${listId}`, 'DELETE')
      history.push('/')
    } catch (err) {}
  }
  const handleAddItemToList = async listId => {
    try {
      const responseData = await sendRequest(
        `/add-item-to-list`,
        'POST',
        {
          itemTitle: addNewItemTextRef.current.value,
          listId: listId
        },
        {
          'Content-Type': 'application/json'
        }
      )
     /* dispatchListData({
        type: 'ADD_ITEM',
        newItem: responseData.newItemResponse
      })*/
      addNewItemTextRef.current.value = ''
    } catch (err) {}
  }

  const handleItemCheckOrUncheck = async (itemId, value) => {
    try {
      const responseData = await sendRequest(
        `/item-check-uncheck`,
        'PATCH',
        {
          itemId,
          checkUncheckBool:value
        },
        {
          'Content-Type': 'application/json'
        }
      )
     /* dispatchListData({
        type: 'CHECK-UNCHECK-ITEM',
        itemId,value
      })*/
    } catch (err) {}
  }

  return {
    //dispatchListData,
    handleListColorChange,
    handleAddItemToList,
    handleDeleteList,
    clearError,
    handleItemCheckOrUncheck,
    //listData,
    listColor,
    isLoading,
    error,
    showConfirmModal,
    addNewItemTextRef
  }
}
