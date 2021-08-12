import React from 'react'
import Message from '../Message'
import styles from './message-list.module.css'

function MessageList ({ list }) {

  return (
    <div className={styles.messagelist}>
      {list.map(message => (
        <Message {...message}/>
      ))}
    </div>
  )
}

export default MessageList
