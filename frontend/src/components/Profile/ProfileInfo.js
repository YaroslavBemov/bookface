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
import { useContext } from 'react'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'


const ProfileInfo = () => {
  const {userStore} = useContext(Context)


  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={userStore.user.avatar}
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
            {userStore.user.firstName}
          </Typography>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {userStore.user.lastName}
          </Typography>
          {/*<Typography*/}
          {/*  color="textSecondary"*/}
          {/*  variant="body1"*/}
          {/*>*/}
          {/*  {`${user.city} ${user.country}`}*/}
          {/*</Typography>*/}
          {/*<Typography*/}
          {/*  color="textSecondary"*/}
          {/*  variant="body1"*/}
          {/*>*/}
          {/*  Date time*/}
          {/*</Typography>*/}
        </Box>
      </CardContent>
      <Divider/>
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
          disabled={true}
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  )
}

export default observer(ProfileInfo)
