import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'

import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '20px'
  }
}))

const ProfileInfo = ({ match }) => {
  const { usersStore } = useContext(Context)
  const id = match.params.id
  const classes = useStyles()

  const fullName = usersStore.user.firstName + ' ' + usersStore.user.lastName

  useEffect(() => {
    usersStore.getUser(id)
  }, [usersStore, id])

  const renderUser = () => {
    if (usersStore.isLoading) return <CircularProgress/>
    if (usersStore.isError) return <div>User error...</div>

    return (
      <Card
        className={classes.root}
      >
        <CardContent>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Avatar
              src={usersStore.user.avatar}
              sx={{
                height: 100,
                width: 100
              }}
            />
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h3"
            >
              {fullName}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      {renderUser()}
    </>
  )
}

export default observer(ProfileInfo)
