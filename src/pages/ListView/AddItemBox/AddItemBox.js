import React, { useRef } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import AddShoppingCartIcon from '@mui/icons-material/Send'

import './AddItemBox.css'
import Icon from '@mui/material/Icon'

export default function AddItemBox (props) {

  return (
    <div className='main-div-Add-item-box__div'>
      <form>
        <Stack direction='row' alignItems='center' spacing={1}>
          <TextField
            fullWidth
            label='Insert New Item'
            id='insertNewItem'
            inputRef={props.textRef}
          />
          <IconButton
          size='large'
            color='primary'
            aria-label='add to shopping cart'
            onClick={props.HandleAddItem}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </Stack>
      </form>
    </div>
  )
}
