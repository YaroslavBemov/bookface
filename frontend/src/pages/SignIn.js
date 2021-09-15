import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Context } from '../index'

import {
  makeStyles,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

function Copyright () {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href={process.env.REACT_APP_LINK_HOMEPAGE}>
        Bookface
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function SignIn () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { userStore } = useContext(Context)
  const classes = useStyles()
  const history = useHistory()

  const emailChangeHandler = (e) => {
    setEmail(e.target.value)
  }

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value)
  }

  const signUpClickHandler = () => {history.push('/signup')}
  const signInClickHandler = () => {
    userStore.signIn(email, password)
    history.push('/')
  }

  const passwordKeyPressHandler = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      signInClickHandler()
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            value={email}
            onChange={emailChangeHandler}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={password}
            onChange={passwordChangeHandler}
            onKeyPress={passwordKeyPressHandler}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Grid container>
            <Grid item xs>
              <Button
                onClick={signUpClickHandler}
                color="primary"
                className={classes.button}
              >
                Sign up
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={signInClickHandler}
                color="primary"
                variant="contained"
                className={classes.button}
              >
                Sign in
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright/>
      </Box>
    </Container>
  )
}
