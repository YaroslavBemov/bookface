import React, { useState } from 'react'
import styles from './Chat.module.css'
import ChatList from '../ChatList'
import MessageList from '../MessageList'

const Chat = () => {
  const [messageList, setMessageList] = useState([])

  return (
    <div className={styles.chat}>
      <ChatList/>
      <MessageList list={messageList} setList={setMessageList}/>
    </div>
  )
}

export default Chat
