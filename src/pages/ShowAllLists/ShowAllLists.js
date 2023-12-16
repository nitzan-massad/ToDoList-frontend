import React, { useEffect, useState } from 'react'

import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner'
import ErrorModal from '../../Components/ErrorModal/ErrorModal'
import ToDoList from '../../Components/ToDoList/ToDoList'
import { useHtppClient } from '../../shared/hooks/http-hook'
import './ShowAllLists.css'

const ShowAllLists = props => {
  const { isLoading, error, sendRequest, clearError } = useHtppClient()
  const [loadedLists, setLoadedLists] = useState([])
  const [contributorOnLists, setContributorOnLists] = useState([])
  const [dontHaveAnyLists, setDontHaveAnyLists] = useState(false)
  useEffect(() => {
    const fetchUserLists = async () => {
      try {
        const responseData = await sendRequest(
          '/list/get-all-user-lists',
          'POST',
          {
            'Content-Type': 'application/json'
          }
        )
        setLoadedLists(responseData.lists)
        setContributorOnLists(responseData.contributorOn)
        if (
          Object.keys(responseData.lists).length === 0 &&
          Object.keys(responseData.contributorOn).length === 0
        )
          setDontHaveAnyLists(true)
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
        {loadedLists.map(list => {
          return <ToDoList key={list.id} listData={list} />
        })}
      </ul>
      <ul>
        {isLoading && <LoadingSpinner asOverlay />}
        {contributorOnLists.map(list => {
          return (<ToDoList key={list.id} listData={list} contributorOnIcon={true} />)
        })}
      </ul>
      {dontHaveAnyLists && (
        <h2 className='dont-have-list-h2'>You Don't Have Any Lists </h2>
      )}
    </React.Fragment>
  )
}

export default ShowAllLists
