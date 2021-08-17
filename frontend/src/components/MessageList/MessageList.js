import React, { useEffect, useRef, useState } from 'react'
import Message from '../Message'
import styles from './Message-list.module.css'
import Button from '../Button'
import InputText from '../InputText'

function MessageList({list, setList}) {
  const [inputText, setInputText] = useState({
    from: '',
    text: ''
  })
  const [isDisabled, setIsDisabled] = useState(true)
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState({display: 'none'})

  const scrollTo = useRef()
  const messageList = useRef()

  useEffect(() => {
    const listener = () => {
      const target = scrollTo.current
      const rect = target.getBoundingClientRect()
      const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight)

      if ((rect.bottom < 0 || rect.top - viewHeight >= 0)) {
        setIsScrollButtonVisible({display: 'inline-block'})
      } else {
        setIsScrollButtonVisible({display: 'none'})
      }
    }

    messageList.current.addEventListener('scroll', listener)

    return () => {
      messageList.current.removeEventListener('scroll', listener)
    }
  }, [])

  useEffect(() => {
    const target = scrollTo.current
    target.scrollIntoView({
      block: 'end',
      behavior: 'smooth'
    })

    setTimeout(() => {
      if (list.length > 0) {
        const author = list[list.length - 1].from
        const text = list[list.length - 1].text

        if (author === 'Anonymous') {
          setList(prev => [...prev, {
            from: 'Bot',
            text: `You send "${text}".`
          }])
        }
      }
    }, 1000)

  }, [list])

  const handleChange = (e) => {
    setInputText({
      from: 'Anonymous',
      text: e.target.value
    })
    setIsDisabled(e.target.value === '')
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      handleClick()
    }
  }
  const handleClick = () => {
    setList(prev => [...prev, inputText])
    setInputText({text: ''})
    setIsDisabled(true)
  }

  const handleScroll = () => {
    const target = scrollTo.current
    const rect = target.getBoundingClientRect()
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight)

    if ((rect.bottom < 0 || rect.top - viewHeight >= 0)) {
      target.scrollIntoView({
        block: 'end',
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.messageList} ref={messageList}>
          {list?.length === 0 && <div className={styles.empty}><span>No messages</span></div>}
          {list?.map(message => (
            <Message {...message}/>
          ))}
          <div ref={scrollTo}/>
        </div>

        <button
          onClick={handleScroll}
          style={isScrollButtonVisible}
          className={styles.scrollButton}
        >Scroll
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
            disabled={isDisabled}
          />
        </div>
      </div>
    </>
  )
}

export default MessageList
