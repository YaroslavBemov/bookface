import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Context } from '../index'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {userStore} = useContext(Context)

  return (
    <Route {...rest} render={props => (
      userStore.isAuth ?
        <Component {...props} />
        : <Redirect to="/signin"/>
    )}/>
  )
}

export default PrivateRoute
