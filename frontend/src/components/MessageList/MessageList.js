import React, { useState } from 'react'
import Message from '../Message'
import styles from './Message-list.module.css'
import Button from '../Button'
import InputText from '../InputText'

function MessageList({list, setList}) {
  const [inputText, setInputText] = useState({})
  const [isDisabled, setIsDisabled] = useState(true)

  const handleChange = (e) => {
    setInputText({text: e.target.value})
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

  return (
    <>
      <div className={styles.container}>
        <div className={styles.messageList}>
          {list.length === 0 && <div>No messages</div>}
          {list.map(message => (
            <Message {...message}/>
          ))}
        </div>

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
