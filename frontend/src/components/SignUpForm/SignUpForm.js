import React, { useContext, useState } from 'react'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'

const SignUpForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { userStore } = useContext(Context)

  const emailChangeHandler = (e) => {
    setEmail(e.target.value)
  }

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value)
  }

  const signUpClickHandler = () => {
    userStore.signUp(email, password)

  }

  return (
    <div>
      <input type="text" placeholder="Email" value={email}
             onChange={emailChangeHandler}/>
      <input type="text" placeholder="Password" value={password}
             onChange={passwordChangeHandler}/>
      <button onClick={signUpClickHandler}>Sign up</button>
    </div>
  )
}

export default observer(SignUpForm)
