import React, { useContext, useEffect, useState } from 'react'
import styles from './Chat.module.css'
import ChatList from '../ChatList'
import MessageList from '../MessageList'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'

const Chat = () => {
  const { chatStore } = useContext(Context)
  const [messageList, setMessageList] = useState([])
  const party = chatStore.party


  useEffect(() => {
    chatStore.getChats()
    chatStore.setParty()
  }, [])

  return (
    <div className={styles.chat}>
      {party.map(item => (
        <ChatList key={item.id} item={item} />
      ))}
      <MessageList list={messageList} setList={setMessageList}/>
    </div>
  )
}

export default observer(Chat)
