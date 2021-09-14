import React, { useContext, useState } from 'react'
import { Button, Grid, TextField } from '@material-ui/core'
import { Context } from '../../index'

const MessageInput = () => {
  const { chatStore } = useContext(Context)
  const [inputText, setInputText] = useState({ content: '' })

  const changeInputTextHandler = (e) => {
    setInputText({
      content: e.target.value
    })
  }

  const keyPressInputHandler = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      sendMessageClickHandler()
    }
  }

  const sendMessageClickHandler = () => {
    chatStore.addMessage(inputText)
    setInputText({ content: '' })
  }

  const renderMessageInput = () => (
    <Grid container>
      <Grid item style={{ flexGrow: 1 }}>
        <form noValidate autoComplete="off">
          <TextField
            id="filled-multiline-flexible"
            label="Message"
            multiline
            maxRows={4}
            value={inputText.content}
            onChange={changeInputTextHandler}
            onKeyPress={keyPressInputHandler}
            variant="filled"
            style={{ width: '100%' }}
          />
        </form>
      </Grid>
      <Grid style={{ display: 'flex' }}>
        <Button
          onClick={sendMessageClickHandler}
        >Send</Button>
      </Grid>
    </Grid>
  )

  return (
    <>
      {renderMessageInput()}
    </>
  )
}

export default MessageInput
