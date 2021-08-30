import React, { useContext, useEffect, useState } from 'react'
import styles from './Chat.module.css'
import ChatList from '../ChatList'
import MessageList from '../MessageList'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'

const Chat = () => {
  const { chatStore, userStore } = useContext(Context)
  const [messageList, setMessageList] = useState([])
  const chats = toJS(chatStore.chats)

  const party = chats.map(item => {
    const id = item._id
    const members = item.party
      .filter(member => member.id !== userStore.user.id)
      .map(member => member.name)
    return {id, members}
  })

  useEffect(() => {
    chatStore.getChats()
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
