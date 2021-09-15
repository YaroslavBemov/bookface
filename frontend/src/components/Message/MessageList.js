import React, { useContext, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'
import clsx from 'clsx'

import Message from './Message'

import { CircularProgress, Grid, makeStyles, Paper, IconButton } from '@material-ui/core'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'

const useStyles = makeStyles((theme) => ({
  messageList: {
    // position: 'relative',
    flexGrow: 1,
    maxHeight: 'calc(100vh - 173px)',
    flexWrap: 'nowrap',
    flexDirection: 'column',
    overflowY: 'auto'
  },
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
  },
  scrollButton: {
    position: 'fixed',
    left: '58%',
    bottom: '100px',
    margin: theme.spacing(1),
  },
  scrollTo: {
    // position: 'relative',
  }
}))

const MessageList = () => {
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState({display: 'none'})
  const { chatStore, userStore } = useContext(Context)
  const chats = chatStore.chats
  const classes = useStyles()

  const scrollTo = useRef()
  const messageList = useRef()

  const scrollHandler = () => {
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

  useEffect(() => {
    const target = scrollTo.current
    target.scrollIntoView({
      block: 'end',
      behavior: 'smooth'
    })


  }, [chats])

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

  const renderMessageList = () => {
    if (chatStore.isLoading) return <CircularProgress/>
    if (!chatStore.currentChatId) return <div>No current chat.</div>
    if (chatStore.isError) return <div>Unable to display messages.</div>

    return chatStore.getCurrentChatMessages.map(message => (
      <Paper
        key={message._id}
        className={clsx(
          classes.paper,
          message.author === userStore.user.id
            ? classes.alignRight
            : classes.alignLeft
        )}
      >
        <Message message={message}/>
      </Paper>
    ))
  }

  return (
    <Grid container item
          className={classes.messageList}
          ref={messageList}
    >
      {renderMessageList()}
      <IconButton
        onClick={scrollHandler}
        className={classes.scrollButton}
        style={isScrollButtonVisible}
        size="medium"
      >
        <ArrowDownwardIcon fontSize="inherit" />
      </IconButton>
      <div ref={scrollTo}/>
    </Grid>
  )
}

export default observer(MessageList)
