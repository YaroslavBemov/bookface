import React, { useContext, useEffect, useState } from 'react'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import Message from '../Message'
import styles from './Message-list.module.css'
import Button from '../Button'
import InputText from '../InputText'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'

function MessageList () {
  const { chatStore } = useContext(Context)
  // const currentChatId = chatStore.currentChatId
  // const chat = chatStore.chats.filter(chat => chat._id === chatStore.currentChatId)
  // const messages = chat[0]?.messages

  const [inputText, setInputText] = useState({
    content: ''
  })
  // const [isDisabled, setIsDisabled] = useState(true)
  // const [isScrollButtonVisible, setIsScrollButtonVisible] = useState({display: 'none'})

  // const scrollTo = useRef()
  // const messageList = useRef()

  // useEffect(() => {
  //   const listener = () => {
  //     const target = scrollTo.current
  //     const rect = target.getBoundingClientRect()
  //     const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight)
  //
  //     if ((rect.bottom < 0 || rect.top - viewHeight >= 0)) {
  //       setIsScrollButtonVisible({display: 'inline-block'})
  //     } else {
  //       setIsScrollButtonVisible({display: 'none'})
  //     }
  //   }
  //
  //   messageList.current.addEventListener('scroll', listener)
  //
  //   // return () => {
  //   //   messageList.current.removeEventListener('scroll', listener)
  //   // }
  // }, [])

  // useEffect(() => {
  //   const target = scrollTo.current
  //   target.scrollIntoView({
  //     block: 'end',
  //     behavior: 'smooth'
  //   })
  //
  //   // setTimeout(() => {
  //   //   if (list.length > 0) {
  //   //     const author = list[list.length - 1].from
  //   //     const text = list[list.length - 1].text
  //   //
  //   //     if (author === 'Anonymous') {
  //   //       setList(prev => [...prev, {
  //   //         from: 'Bot',
  //   //         text: `You send "${text}".`
  //   //       }])
  //   //     }
  //   //   }
  //   // }, 1000)
  //
  // }, [list])

  const handleChange = (e) => {
    setInputText({
      content: e.target.value
    })
    // setIsDisabled(e.target.value === '')
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      handleClick()
    }
  }
  const handleClick = () => {
    chatStore.addMessage(inputText)
    setInputText({ content: '' })
    // setIsDisabled(true)
  }

  // const handleScroll = () => {
  //   // const target = scrollTo.current
  //   const rect = target.getBoundingClientRect()
  //   const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight)
  //
  //   if ((rect.bottom < 0 || rect.top - viewHeight >= 0)) {
  //     target.scrollIntoView({
  //       block: 'end',
  //       behavior: 'smooth'
  //     })
  //   }
  // }

  useEffect(() => {
    console.log('render')
    // chatStore.getCurrentChat()
  }, [])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.messageList}
          // ref={messageList}
        >
          {chatStore.currentChat.messages?.length === 0 &&
          <div className={styles.empty}><span>No messages</span></div>}
          {chatStore.currentChat.messages?.map(message => (
            <Message message={message}/>
          ))}
          {/*<div ref={scrollTo}/>*/}
        </div>

        <button
          // onClick={handleScroll}
          // style={isScrollButtonVisible}
          className={styles.scrollButton}
        ><ArrowDownwardIcon/>
        </button>

        <div className={styles.input}>
          <InputText
            classes={styles.text}
            value={inputText.text}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          <Button
            classes={styles.button}
            // icon={'send'}
            title="Send"
            onClick={handleClick}
            // disabled={isDisabled}
          />
        </div>
      </div>
    </>
  )
}

export default observer(MessageList)
