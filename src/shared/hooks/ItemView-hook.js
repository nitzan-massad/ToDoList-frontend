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
    case 'CHECK-UNCHECK-ITEM':
      const itemsToUpdate = state.items
      const currentIndex2 = itemsToUpdate.findIndex(
        item => item.id == action.itemId
      )
      itemsToUpdate[currentIndex2].isDone = action.valueToUpdate
      return {
        ...state,
        items: itemsToUpdate.sort(sortItems)
      }
    default:
      throw new Error()
  }
}
const sortItems = (a, b)=>{
  if (!a.isDone && !b.isDone){ return (new Date(b.creationDate) - new Date(a.creationDate))}
  else if(a.isDone && !b.isDone){return 1}
  else if(!a.isDone && b.isDone){return -1}
  else if(a.isDone && b.isDone){return (new Date(b.completedDate) - new Date(a.completedDate))}
}
export const useItemView = (color, items,listIdntifier) => {
  const [listColor, setListColor] = useState(color)
  const [listId, setListId] = useState(listIdntifier)
  const { isLoading, error, sendRequest, clearError } = useHtppClient()
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const history = useHistory()
  const addNewItemTextRef = useRef('')
  const [listData, dispatchListData] = useReducer(itemListReducer, {
    items: items?.sort(sortItems)
  })

  const handleListColorChange = async (newColor) => {
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

  return {
    dispatchListData,
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
  }
}
