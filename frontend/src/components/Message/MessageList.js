import React, { useContext, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'
import clsx from 'clsx'

import Message from './Message'

import { CircularProgress, Grid, makeStyles, Paper, IconButton } from '@material-ui/core'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'

const useStyles = makeStyles((theme) => ({
  messageList: {
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
  scrollButton: {}
}))

const MessageList = () => {
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState({display: 'none'})
  const { chatStore, userStore } = useContext(Context)
  const classes = useStyles()

  const scrollTo = useRef()
  const messageList = useRef()

  useEffect(() => {
    const listener = () => {
      const target = scrollTo.current
      const rect = target.getBoundingClientRect()
      const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight)

      // if ((rect.bottom < 0 || rect.top - viewHeight >= 0)) {
      //   setIsScrollButtonVisible({display: 'inline-block'})
      // } else {
      //   setIsScrollButtonVisible({display: 'none'})
      // }
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
    <Grid container item
          className={classes.messageList}
          ref={messageList}
    >
      {renderMessageList()}
      <IconButton aria-label="delete" className={classes.margin} size="small">
        <ArrowDownwardIcon fontSize="inherit" />
      </IconButton>
        <button
          // onClick={handleScroll}
          // style={isScrollButtonVisible}
          className={classes.scrollButton}
        ><ArrowDownwardIcon/>
        </button>
      <div ref={scrollTo}/>
    </Grid>
  )
}

export default observer(MessageList)
