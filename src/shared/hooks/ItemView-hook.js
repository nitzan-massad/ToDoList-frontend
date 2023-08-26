import { useState, useRef, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import { useHtppClient } from './http-hook'

const itemListReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      console.log('hadas is the queen:' + JSON.stringify(action.newItem))
      return {
        ...state,
        items: [action.newItem].concat(state.items)
      }
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.itemsData
      }
    case 'CHECK-UNCHECK-ITEM':
      const itemsToUpdate = state.items
      const currentIndex2 = itemsToUpdate.findIndex(
        item => item.id === action.itemId
      )
      if (currentIndex2 >-1)
        itemsToUpdate[currentIndex2].isDone = action.valueToUpdate
      return {
        ...state,
        items: itemsToUpdate.sort(sortItems)
      }
    case 'MODIFY_ITEM':
      const itemsToModify = state.items
      const currentIndex = itemsToModify.findIndex(
        item => item.id === action.itemId
      )
      if (currentIndex >-1)
        itemsToModify[currentIndex].itemTitle = action.item.itemTitle
      return {
        ...state,
        items: itemsToModify.sort(sortItems)
      }
    case 'DELETE_ITEM':
      const itemsToDeleteFrom = state.items
      const currentIndex3 = itemsToDeleteFrom.findIndex(
        item => item.id === action.itemId
      )
      if (currentIndex3 >-1)
        itemsToDeleteFrom.splice(currentIndex3, 1)
      return {
          ...state,
          items: itemsToDeleteFrom.sort(sortItems)
      }
    default:
      throw new Error()
  }
}
export const sortItems = (a, b) => {
  if (!a.isDone && !b.isDone) {
    return new Date(b.creationDate) - new Date(a.creationDate)
  } else if (a.isDone && !b.isDone) {
    return 1
  } else if (!a.isDone && b.isDone) {
    return -1
  } else if (a.isDone && b.isDone) {
    return new Date(b.completedDate) - new Date(a.completedDate)
  }
}
export const useItemView = (color, itemsData, listIdntifier) => {
  const [listColor, setListColor] = useState(color)
  const [listId, setListIdntifier] = useState(listIdntifier)
  const { isLoading, error, sendRequest, clearError } = useHtppClient()
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const history = useHistory()
  const addNewItemTextRef = useRef('')
  const [listData, dispatchListData] = useReducer(itemListReducer, {
    items: itemsData?.sort(sortItems)
  })

  if (listIdntifier !== listId) {
    dispatchListData({
      type: 'SET_ITEMS',
      itemsData: itemsData
    })
    setListIdntifier(listIdntifier)
    setListColor(color)
  }
  const handleListColorChange = async newColor => {
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
  const handleDeleteList = async () => {
    setShowConfirmModal(false)
    try {
      await sendRequest(`/delete-list/${listId}`, 'DELETE')
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
          listId: listId
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
      await sendRequest(
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
  const handleItemModify = async item => {
      dispatchListData({
        type: 'MODIFY_ITEM',
        itemId: item._id,
        item: item
      })   
  }
  const handleItemDelete = async item => {
      dispatchListData({
        type: 'DELETE_ITEM',
        itemId: item._id,
        item: item
      })   
  }

  return {
    dispatchListData,
    handleListColorChange,
    handleAddItemToList,
    handleDeleteList,
    clearError,
    handleItemCheckOrUncheck,
    setShowConfirmModal,
    setListColor,
    handleItemModify,
    handleItemDelete,
    listData,
    listColor,
    isLoading,
    error,
    showConfirmModal,
    addNewItemTextRef
  }
}
