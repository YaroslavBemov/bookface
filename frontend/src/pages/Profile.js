import React from 'react'

import ProfileInfo from '../components/Profile/ProfileInfo'
import ProfileDetails from '../components/Profile/ProfileDetails'

import { Box, Grid } from '@material-ui/core'

const Profile = () => {

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <ProfileInfo/>
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <ProfileDetails/>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Profile
