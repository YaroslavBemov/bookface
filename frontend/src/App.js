import './App.css'
import MessageList from './components/MessageList'
import { useState } from 'react'

function App() {
  const [messageList, setMessageList] = useState([
    {
      from: 'Alex',
      text: 'Hello, Monica!'
    },
    {
      from: 'Monica', text: 'Hi, Alex!)'
    },
    {
      from: 'Alex',
      text: 'Hello, Monica!'
    },
    {
      from: 'Monica', text: 'Hi, Alex!)'
    }
  ])

  return (
    <div className="App">
      <MessageList list={ messageList } setList={ setMessageList }/>
    </div>
  )
}

export default App
