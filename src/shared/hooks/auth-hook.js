import { useState, useCallback, useEffect } from 'react'
import jwt_decode from 'jwt-decode'

export const useAuth = () => {
  const [token, setToken] = useState(undefined)
  const [userDetails, setUserDetails] = useState({
    userFirstName: '',
    userLastName: '',
    userId: null
  })

  const login = useCallback(
    (userId, firstName, lastName, token, ExpirationDate) => {
      console.log('tool'+JSON.stringify(token))
      setToken(token)
      const userDetailsState = {
        userFirstName: firstName,
        userLastName: lastName,
        userId: userId
      }
      setUserDetails(userDetailsState)
      var decodedToken = jwt_decode(token)
      const tokenExpirationDate =
        ExpirationDate || new Date(decodedToken.exp * 1000)
      localStorage.setItem(
        'userData',
        JSON.stringify({
          ...userDetailsState,
          token: token,
          ExpirationDate: tokenExpirationDate.toISOString()
        })
      )
    },
    []
  )
  const logout = useCallback(() => {
    setToken('logOut')
    setUserDetails({
      userFirstName: '',
      userLastName: '',
      userId: null
    })
    localStorage.removeItem('userData')
  }, [])
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'))
    console.log('nitz123 '+JSON.stringify(storedData))
    if (storedData && new Date(storedData.ExpirationDate) > new Date()) {
      login(
        storedData.userId,
        storedData.userFirstName,
        storedData.userLastName,
        storedData.token,
        new Date(storedData.ExpirationDate)
      )
    }else{
      setToken('logOut')
    }
  }, [login])

  return { token, login, logout, userDetails }
}
