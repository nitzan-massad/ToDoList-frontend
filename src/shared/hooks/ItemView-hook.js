import { useState, useRef, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import { useHtppClient } from './http-hook'

const itemListReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
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
      const itemIndex = state.items.findIndex(item => item.id === action.itemId)
      if (itemIndex > -1) itemsToUpdate[itemIndex].isDone = action.valueToUpdate
      return {
        ...state,
        items: itemsToUpdate.sort(sortItems)
      }
    case 'MODIFY_ITEM':
      const itemsToModify = state.items
      const currentIndex = itemsToModify.findIndex(
        item => item.id === action.itemId
      )
      if (currentIndex > -1)
        itemsToModify[currentIndex].itemTitle = action.item.itemTitle
      return {
        ...state,
        items: itemsToModify.sort(sortItems)
      }
    case 'DELETE_ITEM':
      const itemToDeleteIndex = state.items.findIndex(
        item => item.id === action.itemId
      )
      if (itemToDeleteIndex > -1) state.items.splice(itemToDeleteIndex, 1)
      return {
        ...state,
        items: state.items.sort(sortItems)
      }
    default:
      throw new Error()
  }
}
export const sortItems = (a, b) => {
  if (a.isDone && !b.isDone) {
    return 1
  } else if (!a.isDone && b.isDone) {
    return -1
  } else if (a.isDone && b.isDone) {
    return 1
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
        `/list/update-list-color/${listId}`,
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
      await sendRequest(`/list/delete-list/${listId}`, 'DELETE')
      history.push('/')
    } catch (err) {}
  }

  const handleAddItemToList = async () => {
    try {
      const responseData = await sendRequest(
        `/list/add-item-to-list`,
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
    const valueToUpdate = !item.isDone
    dispatchListData({
      type: 'CHECK-UNCHECK-ITEM',
      itemId: item.id,
      valueToUpdate: valueToUpdate
    })
    try {
      await sendRequest(
        `/item/item-check-uncheck`,
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
    } catch (err) {
      dispatchListData({
        type: 'CHECK-UNCHECK-ITEM',
        itemId: item.id,
        valueToUpdate: !valueToUpdate
      })
    }
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

  const handlePositionChange = async (itemId, startIndex, endIndex) => {

    const newListOrder = Array.from(listData.items)
    const [removed] = newListOrder.splice(startIndex, 1)
    newListOrder.splice(endIndex, 0, removed)
   
    await dispatchListData({
      type: 'SET_ITEMS',
      itemsData: newListOrder,    
    })
    try {
      const itemIndex = await sendRequest(
        `/list/update-items-order/${listId}`,
        'PATCH',
        {
          itemsId: itemId,
          itemsPositionEnd:endIndex 
        },
        {
          'Content-Type': 'application/json'
        },
        false
      )
      return itemIndex.index
    } catch (err) {}
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
    handlePositionChange,
    listData,
    listColor,
    isLoading,
    error,
    showConfirmModal,
    addNewItemTextRef
  }
}
