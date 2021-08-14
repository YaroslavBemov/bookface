import React, { useState } from 'react'
import Message from '../Message'
import styles from './message-list.module.css'

function MessageList({ list, setList }) {
  const [input, setInput] = useState({})
  console.log(input)

  const handleInput = (e) => {
    setInput({ text: e.target.value })
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleClick()
    }
  }
  const handleClick = () => {
    setList(prev => [...prev, input])
    setInput({ text: '' })
  }

  return (
    <>
      <div className={ styles.message - list }>
        { list.map(message => (
          <Message { ...message }/>
        )) }
      </div>
      <input type="text" value={ input.text } onChange={ handleInput }
             onKeyPress={ handleKeyPress }/>
      <button onClick={ handleClick }>Send</button>
    </>
  )
}

export default MessageList
