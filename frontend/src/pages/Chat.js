import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'

import MessageList from '../components/Message/MessageList'
import MessageInput from '../components/Message/MessageInput'
import ChatList from '../components/Chat/ChatList'

import { Box, Container, Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  chatList: {
    flexGrow: 1,
    padding: theme.spacing(1),
    alignContent: 'flex-start'
  },
  messageList: {
    flexGrow: 1,
    maxHeight: 'calc(100vh - 173px)',
    flexWrap: 'nowrap',
    flexDirection: 'column',
    overflowY: 'auto'
  }
}))

const Chat = () => {
  const { chatStore } = useContext(Context)

  const classes = useStyles()

  useEffect(() => {
    chatStore.getChats()
  }, [chatStore])

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Grid container spacing={1}
              style={{ height: '100%' }}
        >
          <Grid container item xs={4}
                className={classes.chatList}>
            <ChatList/>
          </Grid>
          <Grid container item xs={8} spacing={3}>
            <Grid container item
                  className={classes.messageList}
            >
              <MessageList/>
            </Grid>
            {chatStore.currentChatId && <MessageInput/>}
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default observer(Chat)
