import React from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'


const ModalVersionTwo = props => {
  const matches = useMediaQuery('(min-width: 768px)')

  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby='child-modal-title'
      aria-describedby='child-modal-description'
    >
      <Box
        sx={{
          pt: 2,
          px: 4,
          pb: 3,
          boxShadow: 24,
          border: '2px solid #000',
          bgcolor: 'background.paper',
          width: matches ? '30%' : '75%',
          height: matches ? '30%' : '35%',
          transform: 'translate(-50%, -50%)',
          left: '50%',
          top: '50%',
          position: 'absolute'
        }}
      >
        {props.children}
      </Box>
    </Modal>
  )
}

export default ModalVersionTwo
