import React, { useContext, useEffect } from 'react'
import { Context } from '../index'
import ChatList from '../components/ChatList/ChatList'
import {
  Card,
  CircularProgress,
  Container,
  Grid,
  Paper
} from '@material-ui/core'
import { observer } from 'mobx-react-lite'
import MessageList from '../components/MessageList'
import { makeStyles } from '@material-ui/core/styles'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import ChatIcon from '@material-ui/icons/Chat'
import { red } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    cursor: 'pointer'
  },
  paper: {
    flexGrow: 1,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  avatar: {
    backgroundColor: red[500]
  },
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

    return chatStore.getChatList.map(chat => (
      <Card
        // onClick={}
        className={classes.root}
      >
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              U
            </Avatar>
          }
          action={
            <IconButton
              aria-label="settings"
              // onClick={}
            >
              <ChatIcon/>
            </IconButton>
          }
          title={'123'}
          // subheader="September 14, 2016"
        />
        </Card>

      // {/*<ChatList*/}
      // {/*  key={chat.id}*/}
      // {/*  id={chat.id}*/}
      // {/*  name={chat.party[0].name}*/}
      // {/*/>*/}
    ))
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
          {/*<Paper className={classes.paper}>*/}
            {renderChatList()}
          {/*</Paper>*/}
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
