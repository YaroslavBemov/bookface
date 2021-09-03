import React, { useContext } from 'react'
import { Context } from '../../index'
import AuthNavBar from './AuthNavBar'
import NotAuthNavBar from './NotAuthNavBar'

const NavBar = () => {
  const { userStore } = useContext(Context)

  const renderNavBar = () => {
    if (userStore.isLoading) return <div>Loading...</div>
    if (userStore.isErrors) return <div>Errors...</div>

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
