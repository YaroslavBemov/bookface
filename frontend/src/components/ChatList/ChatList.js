import React, { useContext } from 'react'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'

const ChatList = ({ id, name }) => {
  const { chatStore } = useContext(Context)

  const chatClickHandler = () => {
    chatStore.setCurrentChatId(id)
  }

  return (
    <div
         onClick={chatClickHandler}
    >
      {name}
    </div>
  )

}

export default observer(ChatList)
