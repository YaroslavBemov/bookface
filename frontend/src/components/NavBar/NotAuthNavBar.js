import React from 'react'
import { useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer'
  }
}))

function ButtonAppBar () {
  const classes = useStyles()
  const history = useHistory()

  const logoClickHandler = () => {
    history.push('/')
  }

  const usersClickHandler = () => {
    history.push('/users')
  }

  const articleClickHandler = () => {
    history.push('/articles')
  }

  const signInClickHandler = () => {
    history.push('/signin')
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container maxWidth="md">
          <Toolbar>
            <Typography
              variant="h6"
              className={classes.title}
              onClick={logoClickHandler}
            >
              Bookface
            </Typography>
            <Button color="inherit" onClick={usersClickHandler}>
              Users
            </Button>
            <Button color="inherit" onClick={articleClickHandler}>
              Articles
            </Button>
            <Button color="inherit" onClick={signInClickHandler}>
              Sign in
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default observer(ButtonAppBar)
