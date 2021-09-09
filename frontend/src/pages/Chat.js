import React, { useContext, useEffect } from 'react'
import { Context } from '../index'
import {
  Box,
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
import { red } from '@material-ui/core/colors'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  paper: {
    flexGrow: 1,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  chatList: {
    flexGrow: 1,
    padding: theme.spacing(1)
  },
  chatItem: {
    width: '100%',
    flexGrow: 1,
    cursor: 'pointer'
  },
  chatCard: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    }
  },
  selected: {
    backgroundColor: theme.palette.action.hover
  },
  messageList: {
    flexGrow: 1,
    padding: theme.spacing(1)
  },
  avatar: {
    backgroundColor: red[500]
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

    return chatStore.getChatList.map(chat => (
      <Grid item
            key={chat.id}
            className={classes.chatItem}
      >
        <Card

          onClick={() => chatStore.setCurrentChatId(chat.id)}
          className={clsx(
            classes.chatCard,
            chatStore.currentChatId === chat.id ? classes.selected : null
          )}
        >
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                U
              </Avatar>
            }
            // action={
            // <IconButton
            //   aria-label="settings"
            //   // onClick={}
            // >
            //   {/*<ChatIcon/>*/}
            // </IconButton>
            // }
            title={chat.party[0].name}
            // subheader="September 14, 2016"
          />
        </Card>
      </Grid>
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
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%'
          // py: 3
        }}
      >
        <Grid container spacing={1}>
          <Grid container item xs={4}
            // spacing={3}
                className={classes.chatList}>
            {renderChatList()}
          </Grid>
          <Grid container item xs={8}
                spacing={3}
                className={classes.messageList}>
            {renderMessageList()}
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default observer(Chat)
