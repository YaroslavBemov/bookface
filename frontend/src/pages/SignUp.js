import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Context } from '../index'

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  makeStyles
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
    marginTop: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function SignUp () {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { userStore } = useContext(Context)

  const classes = useStyles()
  const history = useHistory()

  const firstNameChangeHandler = (e) => {
    setFirstName(e.target.value)
  }

  const lastNameChangeHandler = (e) => {
    setLastName(e.target.value)
  }

  const emailChangeHandler = (e) => {
    setEmail(e.target.value)
  }

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value)
  }

  const signInClickHandler = () => {history.push('/signin')}

  const signUpClickHandler = () => {
    userStore.signUp(firstName, lastName, email, password)
    history.push('/')
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={firstName}
                onChange={firstNameChangeHandler}
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoComplete="fname"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={lastName}
                onChange={lastNameChangeHandler}
                name="lastName"
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={email}
                onChange={emailChangeHandler}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password}
                onChange={passwordChangeHandler}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Button
                onClick={signInClickHandler}
                color="primary"
                className={classes.button}
              >
                Sign in
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={signUpClickHandler}
                color="primary"
                variant="contained"
                className={classes.button}
              >
                Sign up
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright/>
      </Box>
    </Container>
  )
}
