import React, { useContext, useEffect } from 'react'
import { Box, CircularProgress, Container, Grid } from '@material-ui/core'
import UsersList from '../components/Users'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'

const Users = () => {
  const {usersStore, chatStore} = useContext(Context)

  useEffect(() => {
    usersStore.getUsers()
    chatStore.getChats()
  }, [usersStore, chatStore])

  const renderUsers = () => {
    if (usersStore.isLoading) return <CircularProgress />
    if (usersStore.noUsers) return <div>No users.</div>
    if (usersStore.isErrors) return <div>Error...</div>

    return usersStore.getUsersList.map(user => (
      <Grid key={user.id} item md={12} xs={12}>
        <UsersList user={user}/>
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
