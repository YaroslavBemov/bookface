import React from 'react'
import styles from './Message.module.css'
import classNames from 'classnames'

const Message = ({message}) => {
  console.log(message)
  // const align = author === 'Anonymous' ? styles.mla : null
  // const messageStyles = classNames(styles.message, align)

  return (
    <div
      // className={messageStyles}
    >
      <div className={styles.content}>
        <h3 className={styles.h3}>{message.author}</h3>
        <p>{message.content}</p>
      </div>
    </div>
  )
}

export default Message
