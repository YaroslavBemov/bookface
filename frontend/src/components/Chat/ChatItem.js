import React from 'react'
import { observer } from 'mobx-react-lite'
import clsx from 'clsx'

import { Avatar, Card, CardHeader, Grid, makeStyles } from '@material-ui/core'
import { red } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
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
  avatar: {
    backgroundColor: red[500]
  }
}))

const ChatItem = ({ chat, handler, currentChatId }) => {
  const classes = useStyles()

  return (
    <Grid item
          key={chat.id}
          className={classes.chatItem}
    >
      <Card
        onClick={() => handler(chat.id)}
        className={clsx(
          classes.chatCard,
          currentChatId === chat.id ? classes.selected : null
        )}
      >
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              U
            </Avatar>
          }
          title={chat.party[0].name}
        />
      </Card>
    </Grid>
  )
}

export default ChatItem
