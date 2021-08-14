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
      from: 'Monica',
      text: 'Hi, Alex!)sdddddddddddddddddddddd ddddddddddddddddddddd ddddddddd dddddddddddddddd ddddddddddd ddddddddd'
    },
    {
      from: 'Alex',
      text: 'Happy to see you!'
    },
    {
      from: 'Alex',
      text: 'How are you?sddddddddddddddddddd ddddddddddddddddddddd dddddddddddddd dddddddddddddddddd dddddddddddddddd'
    },
    {
      from: 'Monica',
      text: 'I\'m fine, thx!'
    }
  ])

  return (
    <div className="App">
      <MessageList list={messageList} setList={setMessageList}/>
    </div>
  )
}

export default App
