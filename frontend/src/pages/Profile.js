import React, { useContext } from 'react'
import { Context } from '../index'

const Profile = () => {
  const {userStore} = useContext(Context)
  console.log(userStore)

  return (
    <div>
      <h1>Profile</h1>
      <h2>Email: {userStore.user.email}</h2>
      <h3>Activated: {userStore.user.isActivated + ''}</h3>
    </div>
  )
}

export default Profile