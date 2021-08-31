import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../index'

const ChatList = ({ chat }) => {
  const { userStore, chatStore } = useContext(Context)
  const [membersList, setMembersList] = useState([])

  const chatClickHandler = () => {
    chatStore.setCurrentChatId(chat._id)
  }

  useEffect(() => {
    setMembersList(chat.party
      .filter(member => member.id !== userStore.user.id))
  }, [chat])

  return (
    <div>
      {membersList.map(member =>
        <div key={chat._id} onClick={chatClickHandler}>{member.name}</div>)}
    </div>
  )
}

export default ChatList
