import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'
import clsx from 'clsx'

import Message from './Message'

import { CircularProgress, makeStyles, Paper } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    color: theme.palette.text.secondary,
    maxWidth: '90%'
  },
  alignLeft: {
    alignSelf: 'flex-start'
  },
  alignRight: {
    alignSelf: 'flex-end'
  }
}))

const MessageList = () => {
  const { chatStore, userStore } = useContext(Context)
  const classes = useStyles()

  const renderMessageList = () => {
    if (chatStore.isLoading) return <CircularProgress/>
    if (!chatStore.currentChatId) return <div>No current chat.</div>
    if (chatStore.isError) return <div>Unable to display messages.</div>

    return chatStore.getCurrentChatMessages.map(message => (
      <Paper
        className={clsx(
          classes.paper,
          message.author === userStore.user.id
            ? classes.alignRight
            : classes.alignLeft
        )}
      >
        <Message
          key={message._id}
          message={message}
        />
      </Paper>
    ))
  }

  return (
    <>
      {renderMessageList()}
    </>
  )
}

export default observer(MessageList)
