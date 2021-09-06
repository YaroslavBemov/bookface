import React, { useContext, useEffect } from 'react'
import { Context } from '../index'
import ChatList from '../components/ChatList/ChatList'
import { CircularProgress } from '@material-ui/core'
import { observer } from 'mobx-react-lite'

const Chat = () => {
  const { chatStore } = useContext(Context)

  useEffect(() => {
    chatStore.getChats()
  }, [chatStore])

  const renderChatList = () => {
    if (chatStore.isLoading) return <CircularProgress/>
    if (chatStore.noChats) return <div>No chats.</div>
    if (chatStore.isErrors) return <div>Unable to display chats.</div>

    return chatStore.getChatList.map(chat => {
      return <ChatList
        key={chat.id}
        id={chat.id}
        name={chat.party[0].name}
      />
    })
  }

  return (
    <>
      {renderChatList()}
    </>
  )
}

export default observer(Chat)
