import './App.css'
// import Chat from './components/Chat'
import SignInForm from './components/SignInForm'
import { useContext, useEffect } from 'react'
import { Context } from './index'
import { observer } from 'mobx-react-lite'

function App () {
  const { store } = useContext(Context)

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      store.checkAuth()
    }
  }, [])

  if (store.isLoading) {
    return <div>Loading...</div>
  }

  if (!store.isAuth) {
    return (
      <div className="App">
        <SignInForm/>
      </div>
    )
  }

  return (
    <div className="App">
      <h1>{store.isAuth ? `${store.user.email}` : 'Not auth'}</h1>
      <h1>{store.user.isActivated ? 'Account is activated' : 'Account not activated'}</h1>
      <button onClick={() => store.signOut()}>Sign out</button>
    </div>
  )
}

export default observer(App)
