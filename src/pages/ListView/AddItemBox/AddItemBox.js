import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import AddShoppingCartIcon from '@mui/icons-material/Send'

import './AddItemBox.css'

export default function AddItemBox (props) {
  const [dirAttribute, setDirAttribute ] = useState('ltr') 

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) { // Check if Enter key is pressed (key code 13)
      e.preventDefault(); // Prevent the default form submission behavior
      props.HandleAddItem();
    }
  };
  function isHebrewInput(text) {
    // Regular expression to match Hebrew characters
    const hebrewPattern = /[\u0590-\u05FF]/;
    return hebrewPattern.test(text);
  }
  const handleInputChange = (e) => {
    const newText = e.target.value;
    setDirAttribute(isHebrewInput(newText)? 'rtl' : 'ltr' );
  }
  return (
    <div className='main-div-Add-item-box__div'>
      <form>
        <Stack direction='row' alignItems='center' spacing={1}>
          <TextField
            fullWidth
            label='Insert New Item'
            id='insertNewItem'
            inputRef={props.textRef}
            onKeyDown={handleKeyDown}
            dir={dirAttribute}
            onChange={handleInputChange}
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
