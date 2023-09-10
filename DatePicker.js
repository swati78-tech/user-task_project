import React, { useState } from 'react'
import { TextField, Typography } from '@mui/material'

function DatePickerComponent() {
  const [selectedDate, setSelectedDate] = useState(null)

  return (
    <>
      <Typography
        htmlFor='datePick'
        sx={{
          fontFamily: 'Montserrat',
          fontSize: '13px',
          fontWeight: '500',
          lineHeight: '18px',
          letterSpacing: '0.01em',
          textAlign: 'left',
          color: '#263857',
        }}
      >
        Pick Date
      </Typography>
      <TextField
        variant='standard'
        margin='normal'
        type='date'
        fullWidth
        id='datePick'
        name='datePick'
        value={selectedDate}
        autoFocus
        onChange={(e) => setSelectedDate(e.target.value)}
        placeholder='Pick Date'
        sx={{
          width: '288px',
          background: '#F8FBFF',
          height: '54px',
          borderRadius: '16px',
          color: '#C5C6C6',
          textAlign: 'center',
        }}
      />
    </>
  )
}

export default DatePickerComponent
