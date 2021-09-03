import React, { useContext } from 'react'
import { Context } from '../index'
import { Box, Container, Grid } from '@material-ui/core'
import ProfileInfo from '../components/Profile/ProfileInfo'
import ProfileDetails from '../components/Profile/ProfileDetails'

const Profile = () => {
  const { userStore } = useContext(Context)

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <ProfileInfo/>
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetails/>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Profile
