import React from 'react'

function Message ({ message }) {
  return (
    <>
      <div>
        {message.content}
      </div>
      <div>
        {message.createdAt}
      </div>
    </>
  )
}

export default Message
