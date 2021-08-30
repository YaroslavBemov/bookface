import React, { useState } from 'react'
import styles from './ChatList.module.css'

const ChatList = ({ chat }) => {
  const member = chat.party[1].name

  return (
    <div className={styles.chatList}>
      {chat?.length === 0 && <div className={styles.empty}><span>No chats</span></div>}
      <div>
        {member}
      </div>
    </div>
  )
}

export default ChatList
