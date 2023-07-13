import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import './ColorPicker.css'

const ColorPicker = props => {
  const [pickedColor, setPickedColor] = useState(props.initialColorChoice)

  const handleColorChange = event => {
    event.preventDefault()
    setPickedColor(event.target.value)
    props.pickedAction?.(event.target.value)
  }
  useEffect(() => {
    setPickedColor(props.initialColorChoice)
  }, [props.initialColorChoice])

  const colorOptions = [
    { label: 'Select Color', value: 'None' },
    { label: 'Red', value: 'red' },
    { label: 'Blue', value: 'blue' },
    { label: 'Green', value: 'green' },
    { label: 'Yellow', value: 'yellow' },
    { label: 'Purple', value: 'purple' }
  ]

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Color</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={pickedColor}
          label='Color'
          onChange={handleColorChange}
        >{colorOptions.map(option => (
          <MenuItem key={option.value} value={option.value}>{option.value}</MenuItem>
        ))}
        </Select>
      </FormControl>
    </Box>
  )
}
export default ColorPicker
