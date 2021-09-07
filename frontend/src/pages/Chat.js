import React, { useContext, useEffect } from 'react'
import { Context } from '../index'
import ChatList from '../components/ChatList/ChatList'
import { CircularProgress, Container, Grid, Paper } from '@material-ui/core'
import { observer } from 'mobx-react-lite'
import MessageList from '../components/MessageList'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1
  },
  paper: {
    flexGrow: 1,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))

const Chat = () => {
  const { chatStore } = useContext(Context)
  const classes = useStyles()

  useEffect(() => {
    chatStore.getChats()
  }, [chatStore])

  const renderChatList = () => {
    if (chatStore.isLoading) return <CircularProgress/>
    if (chatStore.noChats) return <div>No chats.</div>
    if (chatStore.isErrors) return <div>Unable to display chats.</div>

    return chatStore.getChatList.map(chat => {
      return <ChatList
        key={chat.id}
        id={chat.id}
        name={chat.party[0].name}
      />
    })
  }

  const renderMessageList = () => {
    if (chatStore.isLoading) return <CircularProgress/>
    if (!chatStore.currentChatId) return <div>No current chat.</div>
    if (chatStore.isErrors) return <div>Unable to display messages.</div>

    return chatStore.getCurrentChatMessages.map(message => (
      <Paper key={message._id} className={classes.paper}>
      <MessageList
        key={message._id}
        message={message}
      />
      </Paper>
    ))
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={1}>
        <Grid container item xs={4} spacing={3}>
          <Paper className={classes.paper}>
            {renderChatList()}
          </Paper>
        </Grid>
        <Grid container item xs={8} spacing={3}>
          {/*<Paper className={classes.paper}>*/}
            {renderMessageList()}
          {/*</Paper>*/}
        </Grid>
      </Grid>
    </Container>
  )
}

export default observer(Chat)
