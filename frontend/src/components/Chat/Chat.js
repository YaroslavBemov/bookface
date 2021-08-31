import React, { useContext, useEffect, useState } from 'react'
import styles from './Chat.module.css'
import ChatList from '../ChatList'
import MessageList from '../MessageList'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

const Chat = () => {
  const { chatStore } = useContext(Context)
  const chats = toJS(chatStore.chats)

  useEffect(() => {
    chatStore.getChats()
  }, [])

  return (
    <div className={styles.chat}>
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        {chats.map(chat => (
          <ChatList key={chat._id} chat={chat}/>
        ))}
      </div>

      <MessageList/>
    </div>
  )
}

export default observer(Chat)
