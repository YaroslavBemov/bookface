import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader, CircularProgress,
  Divider,
  Grid,
  TextField
} from '@material-ui/core'


const ProfileDetails = () => {
  const { userStore } = useContext(Context)

  const [values, setValues] = useState({
    firstName: userStore.user.firstName,
    lastName: userStore.user.lastName,
    email: userStore.user.email
  })

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  const saveButtonHandler = () => {
    userStore.updateProfile(values)
  }

  const renderCard = () => {
    if (userStore.isLoading) return <CircularProgress/>
    if (userStore.isError) return <div>Errors...</div>

    return <Card>
      <CardHeader
        subheader="The information can be edited"
        title="Profile"
      />
      <Divider/>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              helperText="Please specify the first name"
              label="First name"
              name="firstName"
              onChange={handleChange}
              required
              value={values.firstName}
              variant="outlined"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Last name"
              name="lastName"
              onChange={handleChange}
              required
              value={values.lastName}
              variant="outlined"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              onChange={handleChange}
              required
              value={values.email}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </CardContent>
      <Divider/>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={saveButtonHandler}
        >
          Save details
        </Button>
      </Box>
    </Card>
  }

  return (
    <form
      autoComplete="off"
      noValidate
    >
      {renderCard()}
    </form>
  )
}

export default observer(ProfileDetails)
