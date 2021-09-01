import React, { useContext, useEffect } from 'react'
import ChatList from '../ChatList'
import MessageList from '../MessageList'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'
import { useDispatch, useSelector } from 'react-redux'
import { fetchChats, chatsSelector } from '../../slices/chats'
import { toJS } from 'mobx'

const Chat = () => {
  const { chatStore, userStore } = useContext(Context)

  useEffect(() => {
    chatStore.getChats()
  }, [chatStore])

  // const dispatch = useDispatch()
  // const { chats, loading, hasErrors } = useSelector(chatsSelector)

  // useEffect(() => {
  //   dispatch(fetchChats('61289e5c4b4fc51c8cd5ed2b'))
  // }, [dispatch])

  const renderChats = () => {
    if (chatStore.loading) return <p>Loading posts...</p>
    if (chatStore.hasErrors) return <p>Unable to display chats.</p>

    return chatStore.getChatList.map(chat => {
      return <ChatList
        key={chat[0][0]._id}
        id={chat[0][0]._id}
        name={chat[0][0].name}
      />
    })
  }

  return (
    <section>
      <h1>Chats</h1>
      {renderChats()}
    </section>
  )



  // return (
  //   <div>
  //     <div>
  //       {chatStore.chatList.map(chat => {
  //         const id = chat[0]._id
  //         const name = chat[0].name
  //         return <ChatList id={id} name={name}/>
  //       })}
  //     </div>
  //     <MessageList/>
  //   </div>
  // )
}

export default observer(Chat)
