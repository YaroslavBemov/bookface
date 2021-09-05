import React, { useContext, useEffect } from 'react'
import { Box, Container, Grid } from '@material-ui/core'
import UsersList from '../components/Users'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'

const Users = () => {
  const {usersStore} = useContext(Context)

  useEffect(() => {
    usersStore.getUsers()
  }, [usersStore])

  const renderUsers = () => {
    if (usersStore.isLoading) return <div>Loading...</div>
    if (usersStore.isErrors) return <div>Errors...</div>

    return usersStore.users.map(user => (
      <Grid item md={12} xs={12}>
        <UsersList key={user.id} user={user}/>
      </Grid>
    ))
  }

  return (
    <Container maxWidth="md">
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
          {renderUsers()}
        </Grid>
      </Box>
    </Container>
  )
}

export default observer(Users)
