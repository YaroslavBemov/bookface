import React, { useContext, useState } from 'react'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

const SignInForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { userStore } = useContext(Context)

  const history = useHistory()

  const emailChangeHandler = (e) => {
    setEmail(e.target.value)
  }

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value)
  }

  const signInClickHandler = () => {
    userStore.signIn(email, password)
    history.push('/')
  }

  return (
    <div>
      <input type="text" placeholder="Email" value={email}
             onChange={emailChangeHandler}/>
      <input type="text" placeholder="Password" value={password}
             onChange={passwordChangeHandler}/>
      <button onClick={signInClickHandler}>Sign in</button>
    </div>
  )
}

export default observer(SignInForm)
