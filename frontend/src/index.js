import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
// import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import RootStore from './store/RootStore'

// import { configureStore } from '@reduxjs/toolkit'
// import { Provider } from 'react-redux'
// import rootReducer from './slices'

// const store = configureStore({ reducer: rootReducer })

const rootStore = new RootStore()

export const Context = createContext(rootStore)

ReactDOM.render(
  <React.StrictMode>
    <Context.Provider value={rootStore}>
      {/*<Provider store={store}>*/}
        <App/>
      {/*</Provider>*/}
    </Context.Provider>

  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
