import React, { useEffect, useState } from 'react'

import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner'
import ErrorModal from '../../Components/ErrorModal/ErrorModal'
import ToDoList from '../../Components/ToDoList/ToDoList'
import { useHtppClient } from '../../shared/hooks/http-hook'

const ShowAllLists = props => {
  const { isLoading, error, sendRequest, clearError } = useHtppClient()
  const [loadedLists, setLoadedLists] = useState([])

  useEffect(() => {
    const fetchUserLists = async () => {
      try {
        const responseData = await sendRequest('/get-all-user-lists', 'POST', {
          'Content-Type': 'application/json'
        })
        setLoadedLists(responseData.lists)
      } catch (err) {
        console.log(err)
      }
    }

    fetchUserLists()
  }, [sendRequest])

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <ul>
        {isLoading && <LoadingSpinner asOverlay />}
        {loadedLists.map(list => (
          <ToDoList key={list.id} listData={list} />
        ))}
      </ul>
    </React.Fragment>
  )
}

export default ShowAllLists
