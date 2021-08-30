import React, { useContext, useEffect, useState } from 'react'
import styles from './Chat.module.css'
import ChatList from '../ChatList'
import MessageList from '../MessageList'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

const Chat = () => {
  const [messageList, setMessageList] = useState([])
  const { chatStore } = useContext(Context)
  // const chats = chatStore.chats
  console.log(toJS(chatStore.chats[0]))

  useEffect(() => {
    chatStore.getChats()
  }, [])

  return (
    <div className={styles.chat}>
      {chatStore.chats.map(chat => (
        <ChatList chat={toJS(chat)}/>
      ))}
      <MessageList list={messageList} setList={setMessageList}/>
    </div>
  )
}

export default observer(Chat)
