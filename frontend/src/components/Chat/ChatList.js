import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'

import { CircularProgress } from '@material-ui/core'
import ChatItem from './ChatItem'

const ChatList = () => {
  const { chatStore } = useContext(Context)

  const clickHandler = (id) => {
    chatStore.setCurrentChatId(id)
  }

  const currentChatId = chatStore.currentChatId

  const renderChatList = () => {
    if (chatStore.isLoading) return <CircularProgress/>
    if (chatStore.noChats) return <div>No chats.</div>
    if (chatStore.isError) return <div>Unable to display chats.</div>

    return chatStore.getChatList.map(chat => (
      <ChatItem
        key={chat.id}
        chat={chat}
        handler={clickHandler}
        currentChatId={currentChatId}
      />
    ))
  }

  return (
    <>
      {renderChatList()}
    </>
  )

}

export default observer(ChatList)
