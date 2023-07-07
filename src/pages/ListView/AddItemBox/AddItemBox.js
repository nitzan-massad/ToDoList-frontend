import React, { useRef } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import './AddItemBox.css'

export default function AddItemBox (props) {



  return (
    <div className='main-div-Add-item-box__div'>
      <form >
        <Box sx={{ width: 400, maxWidth: '100%' }}>
          <TextField
            fullWidth
            label='Insert New Item'
            id='insertNewItem'
            inputRef={props.textRef}
          />
        </Box>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <Fab color='primary' aria-label='add'>
            <AddIcon onClick={props.HandleAddItem} />
          </Fab>
        </Box>
      </form>
    </div>
  )
}
