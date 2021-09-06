import React, { useContext } from 'react'
import { Context } from '../../index'
import AuthNavBar from './AuthNavBar'
import NotAuthNavBar from './NotAuthNavBar'
import { CircularProgress } from '@material-ui/core'

const NavBar = () => {
  const { userStore } = useContext(Context)

  const renderNavBar = () => {
    if (userStore.isLoading) return <CircularProgress />
    if (userStore.isErrors) return <div>Error...</div>

    if (userStore.isAuth) return <AuthNavBar/>
    else return <NotAuthNavBar/>
  }

  return (
    <>
      {renderNavBar()}
    </>
  )
}

export default NavBar
