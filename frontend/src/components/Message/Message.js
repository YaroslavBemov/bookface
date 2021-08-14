import React from 'react'
import styles from './Message.module.css'
import classNames from 'classnames'

const Message = ({from = 'Anonymous', text = 'No message'}) => {
  const align = from === 'Monica' ? styles.mla : null
  const messageStyles = classNames(styles.message, align)

  return (
    <div className={messageStyles}>
      <div className={styles.content}>
        <h3 className={styles.h3}>{from}</h3>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default Message
