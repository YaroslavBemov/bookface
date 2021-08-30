import React, { useContext } from 'react'
import { Context } from '../../index'

const ChatList = ({ item }) => {
  const {chatStore} = useContext(Context)

  const chatClickHandler = () => {
    chatStore.setCurrentChatId(item.id)
  }

  return (
      <div onClick={chatClickHandler}>
        {item.members.map(member => <span>{member}</span>)}
      </div>
  )
}

export default ChatList
