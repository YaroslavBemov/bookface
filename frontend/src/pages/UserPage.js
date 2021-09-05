import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core'
import { useContext, useEffect } from 'react'
import { Context } from '../index'
import { makeStyles } from '@material-ui/core/styles'
import { observer } from 'mobx-react-lite'
//
// const user = {
//   avatar: '/static/images/avatars/avatar_6.png',
//   city: 'Los Angeles',
//   country: 'USA',
//   jobTitle: 'Senior Developer',
//   name: 'Katarina Smith',
//   timezone: 'GTM-7'
// }

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '20px'
  }
}))

const ProfileInfo = ({match}) => {
  const {usersStore} = useContext(Context)
  const id = match.params.id
  const classes = useStyles()

  useEffect(() => {
    usersStore.getUser(id)
  }, [])

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
            {usersStore.user.firstName} {usersStore.user.lastName}
          </Typography>
          {/*<Typography*/}
          {/*  color="textSecondary"*/}
          {/*  variant="body1"*/}
          {/*>*/}
          {/*  {`${usersStore.user.city} ${usersStore.user.country}`}*/}
          {/*</Typography>*/}
          {/*<Typography*/}
          {/*  color="textSecondary"*/}
          {/*  variant="body1"*/}
          {/*>*/}
          {/*  Date time*/}
          {/*</Typography>*/}
        </Box>
      </CardContent>
      {/*<Divider/>*/}
      {/*<CardActions>*/}
      {/*  <Button*/}
      {/*    color="primary"*/}
      {/*    fullWidth*/}
      {/*    variant="text"*/}
      {/*  >*/}
      {/*    Upload picture*/}
      {/*  </Button>*/}
      {/*</CardActions>*/}
    </Card>
  )
}

export default observer(ProfileInfo)
