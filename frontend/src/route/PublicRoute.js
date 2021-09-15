import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Context } from '../index'

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const { userStore } = useContext(Context)

  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route {...rest} render={props => (
      userStore.isAuth && restricted ?
        <Redirect to="/dashboard"/>
        : <Component {...props} />
    )}/>
  )
}

export default PublicRoute
