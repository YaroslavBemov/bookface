import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import { observer } from 'mobx-react-lite'

import { Context } from './index'
import PrivateRoute from './route/PrivateRoute'

import NavBar from './components/NavBar'
import Main from './pages/Main'
import Chat from './pages/Chat'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Articles from './pages/Articles'
import Profile from './pages/Profile'
import Users from './pages/Users'
import User from './pages/User'

function App () {
  const { userStore } = useContext(Context)

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      userStore.checkAuth()
    }
  }, [userStore])

  if (userStore.isLoading) {
    return <div>Loading...</div>
  }

  if (userStore.isError) {
    return <div>Some error...</div>
  }

  return (
    <BrowserRouter>
      <CssBaseline/>
      <NavBar/>
      <Container maxWidth="lg">
        <Switch>
          <PrivateRoute path="/profile" component={Profile} exact/>
          <PrivateRoute path="/chat" component={Chat} exact/>

          <Route path="/" component={Main} exact/>
          <Route path="/users" component={Users} exact/>
          <Route path="/users/:id" component={User} exact/>
          <Route path="/articles" component={Articles}/>
          <Route path="/signin" component={SignIn} exact/>
          <Route path="/signup" component={SignUp} exact/>
          <Redirect to="/"/>
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default observer(App)
