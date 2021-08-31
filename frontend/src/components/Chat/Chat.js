import React, { useContext, useEffect } from 'react'
import ChatList from '../ChatList'
import MessageList from '../MessageList'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'
import { useDispatch, useSelector } from 'react-redux'
import { fetchChats, chatsSelector } from '../../slices/chats'

const Chat = () => {
  const { chatStore, userStore } = useContext(Context)


  const dispatch = useDispatch()
  const { chats, loading, hasErrors } = useSelector(chatsSelector)

  useEffect(() => {
    dispatch(fetchChats('61289e5c4b4fc51c8cd5ed2b'))
  }, [dispatch])

  const renderChats = () => {
    if (loading) return <p>Loading posts...</p>
    if (hasErrors) return <p>Unable to display chats.</p>

    return chats.map(chat => {
      console.log(chat)
      // const id = chat[0]._id
      // const name = chat[0].name
      return <ChatList key={chat._id} id={chat._id} name={chat.party[1].name}/>
    })
  }

  return (
    <section>
      <h1>Chats</h1>
      {renderChats()}
    </section>
  )

  // useEffect(() => {
  //   chatStore.getChats()
  // }, [chatStore])

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
