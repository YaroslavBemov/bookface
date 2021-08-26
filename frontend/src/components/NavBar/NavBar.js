import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Link, useHistory } from 'react-router-dom'
import { AccountCircle } from '@material-ui/icons'
import { Menu, MenuItem } from '@material-ui/core'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

function ButtonAppBar () {
  const classes = useStyles()
  const { userStore } = useContext(Context)
  const auth = userStore.isAuth

  // const menuRef = useRef()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const history = useHistory()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
    // menuRef.current = event.currentTarget
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const chatClickHandler = () => {
    history.push('/chat')
  }

  const articleClickHandler = () => {
    history.push('/articles')
  }

  const signInClickHandler = () => {
    history.push('/signin')
  }

  const signUpClickHandler = () => {
    history.push('/signup')
  }

  const profileClickHandler = () => {
    history.push('/profile')
    setAnchorEl(null)
  }

  const signOutClickHandler = () => {
    userStore.signOut()
    setAnchorEl(null)
    history.push('/')
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/*<IconButton edge="start" className={classes.menuButton}*/}
          {/*            color="inherit" aria-label="menu">*/}
          {/*  <MenuIcon/>*/}
          {/*</IconButton>*/}
          <Typography variant="h6" className={classes.title}>
            Bookface
          </Typography>
          <Button color='inherit' onClick={chatClickHandler}>Chat</Button>
          <Button color='inherit' onClick={articleClickHandler}>Articles</Button>

          {auth ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={profileClickHandler}>Profile</MenuItem>
                <MenuItem onClick={signOutClickHandler}>Sign out</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Button color="inherit" onClick={signInClickHandler}>Sign in</Button>
              <Button color="inherit" onClick={signUpClickHandler}>Sign up</Button>
            </div>
          )}

        </Toolbar>
      </AppBar>
    </div>
  )
}

export default observer(ButtonAppBar)
