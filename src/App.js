import React, { Suspense, } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import { AuthContext } from './shared/context/AuthContext'
import { useAuth } from './shared/hooks/auth-hook'
import LoadingSpinner from './Components/LoadingSpinner/LoadingSpinner'
import MainNavigation from './Navigation/MainNavigation/MainNavigation'
const ShowAllLists = React.lazy(() =>
  import('./pages/ShowAllLists/ShowAllLists')
)
const Login = React.lazy(() => import('./pages/Login/Login'))
const Fotter = React.lazy(() => import('./Navigation/Fotter/Fotter'))
const ListView = React.lazy(() => import('./pages/ListView/ListView'))

function App () {
  const { token, login, logout, userDetails } = useAuth()

  let routes

  if (token && token !== 'logOut') {
    routes = (
      <Switch>
        <Route path='/' exact>
          <ShowAllLists />
        </Route>
        <Route path='/showList' exact component={ListView} />
        <Redirect to='/' />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Redirect to='/login' />
      </Switch>
    )
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userFirstName: userDetails?.userFirstName,
        userLastName: userDetails?.userLastName,
        userId: userDetails?.userId,
        login: login,
        logout: logout
      }}
    >
      <BrowserRouter>
        <MainNavigation />
        <main>
          <Suspense fallback={<LoadingSpinner />}>
            {token ? routes : <LoadingSpinner />}
          </Suspense>
        </main>
        <Fotter />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
