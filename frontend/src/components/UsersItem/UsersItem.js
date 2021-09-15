import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import { red } from '@material-ui/core/colors'
import ChatIcon from '@material-ui/icons/Chat'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { Button, Icon, TextField } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    cursor: 'pointer'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  modalForm: {
    width: '300px'
  },
  button: {
    margin: theme.spacing(1)
  }
}))

const RecipeReviewCard = ({ user }) => {
  const { chatStore } = useContext(Context)
  const [open, setOpen] = useState(false)
  const [content, setContent] = useState('')
  const classes = useStyles()
  const history = useHistory()

  const fullName = `${user.firstName} ${user.lastName}`

  const cardClickHandler = () => {
    history.push(`/users/${user.id}`)
  }

  const sendMessageClickHandler = (e) => {
    e.stopPropagation()
    const chatId = chatStore.getChatIdWithUser(user.id)
    if (chatId) {
      chatStore.setCurrentChatId(chatId)
      history.push('/chat')
    }
    handleOpen()
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const modalInputChangeHandler = (e) => {
    setContent(e.target.value)
  }

  const modalButtonClickHandler = () => {
    chatStore.addChat(user.id, fullName, content)
    history.push('/chat')
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Transition modal</h2>
            <form className={classes.modalForm} noValidate autoComplete="off">
              <TextField
                onChange={modalInputChangeHandler}
                id="outlined-multiline-static"
                label="Message"
                multiline
                rows={4}
                defaultValue={content}
                variant="outlined"
              />
            </form>
            <Button
              onClick={modalButtonClickHandler}
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<Icon>send</Icon>}
            >
              Send
            </Button>
          </div>
        </Fade>
      </Modal>
      <Card
        onClick={cardClickHandler}
        className={classes.root}
      >
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {user.firstName[0].toUpperCase()}{user.lastName[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton
              aria-label="settings"
              onClick={sendMessageClickHandler}
            >
              <ChatIcon/>
            </IconButton>
          }
          title={fullName}
        />
      </Card>
    </>
  )
}

export default observer(RecipeReviewCard)
