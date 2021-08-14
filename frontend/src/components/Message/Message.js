import React from 'react'
import styles from './message.module.css'

const Message = ({ from = 'Anonymous', text = 'No message' }) => {
  return (
    <div className={ styles.message }>
      <h3 className={ styles.h3 }>{ from }</h3>
      <p>{ text }</p>
    </div>
  )
}

export default Message
