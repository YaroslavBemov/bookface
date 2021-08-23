import React, { useContext, useState } from 'react'
import { Context } from '../../index'

const SignInForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { store } = useContext(Context)

  const emailChangeHandler = (e) => {
    setEmail(e.target.value)
  }

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div>
      <input type="text" placeholder="Email" value={email}
             onChange={emailChangeHandler}/>
      <input type="text" placeholder="Password" value={password}
             onChange={passwordChangeHandler}/>
      <button onClick={() => store.signUp(email, password)}>Sign up</button>
      <button onClick={() => store.signIn(email, password)}>Sign in</button>
    </div>
  )
}

export default SignInForm
