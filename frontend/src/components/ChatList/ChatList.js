import React, { useState } from 'react'
import styles from './ChatList.module.css'

const ChatList = () => {
  const [chatList, setChatList] = useState([
    {
      id: 1,
      title: 'First chat'
    },
    {
      id: 2,
      title: 'Second chat'
    },
    {
      id: 3,
      title: 'Third chat'
    }
  ])

  return (
    <div className={styles.chatList}>
      {chatList.map((chat) => (
        <div key={chat.id}>{chat.title}</div>
      ))}
    </div>
  )
}

export default ChatList
