import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from './index'

import NavBar from './components/NavBar'

import './App.css'
import Main from './pages/Main'
import ChatPage from './pages/ChatPage'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Article from './pages/Article'
import Profile from './pages/Profile'

function App () {
  const { userStore } = useContext(Context)

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      userStore.checkAuth()
    }
  }, [])

  // if (store.isLoading) {
  //   return <div>Loading...</div>
  // }

  // if (!store.isAuth) {
  //   return (
  //     <div className="App">
  //       <SignInForm/>
  //     </div>
  //   )
  // }

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar/>
        <Switch>
          <Route path="/" exact>
            <Main/>
          </Route>
          <Route path="/chat">
            <ChatPage/>
          </Route>
          <Route path="/articles">
            <Article/>
          </Route>
          <Route path="/profile">
            <Profile/>
          </Route>
          <Route path="/signin">
            <SignIn/>
          </Route>
          <Route path="/signup">
            <SignUp/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default observer(App)
