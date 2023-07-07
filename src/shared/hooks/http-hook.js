import { useState, useCallback, useRef, useEffect, useContext } from 'react'
import { AuthContext } from '../../shared/context/AuthContext'

export const useHtppClient = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const activeHttpRequests = useRef([])
  const auth = useContext(AuthContext)

  const sendRequest = useCallback(
    async (
      url,
      method = 'Get',
      body = null,
      headers = {},
      showLoadingScreen = true
    ) => {
      if (showLoadingScreen) {
        setIsLoading(true)
      }
      const fullUrl = process.env.REACT_APP_BACKEND_URL + url
      if (body) {
        body = JSON.stringify(body)
      }
      if (auth.isLoggedIn) {
        Object.assign(headers, { Authorization: 'Bearer ' + auth.token })
      }
      const httpAbortCtrll = new AbortController()
      activeHttpRequests.current.push(httpAbortCtrll)
      try {
        const response = await fetch(fullUrl, {
          method,
          body,
          headers,
          signal: httpAbortCtrll.signal
        })
        const responseData = await response.json()
        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortCtrll
        )
        if (!response.ok) {
          throw new Error(responseData.message)
        }
        if (showLoadingScreen) {
          setIsLoading(false)
        }
        return responseData
      } catch (err) {
        if (showLoadingScreen) {
          setIsLoading(false)
        }
        setError(err.message || 'Something went wrong, please try again.')
        throw err
      }
    },
    [auth.token, auth.isLoggedIn]
  )

  const clearError = () => {
    setError(null)
  }
  useEffect(() => {
    return () => {
      //activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
    }
  }, [])

  return { isLoading, error, sendRequest, clearError }
}
