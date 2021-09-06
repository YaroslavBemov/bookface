import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'

export default function PositionedSnackbar ({message}) {
  const [state, setState] = React.useState({
    open: true,
    vertical: 'top',
    horizontal: 'center'
  })

  const { vertical, horizontal, open } = state

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState })
  }

  const handleClose = () => {
    setState({ ...state, open: false })
  }


  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
      />
    </div>
  )
}
