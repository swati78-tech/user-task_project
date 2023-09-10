import React, { useState, useEffect } from 'react'
import axios from 'axios'
import EmployeeList from './EmployeeList'
import EmployeeDropdown from './EmployeeDropdown'
import DatePickerComponent from './DatePicker'

import {
  Box,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  Button,
} from '@mui/material'

function EmployeeRegistrationForm() {
  // Define state variables to store form input values
  const [id, setId] = useState(1)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDob] = useState('')
  const [study, setStudy] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [currentSalary, setCurrentSalary] = useState('')
  const [description, setDescription] = useState('')
  const [employees, setEmployees] = useState([])
  const [newEmployee, setNewEmployee] = useState({
    id: 83,
    FirstName: 'Anshuman',
    LastName: 'Pandey',
    DOB: '2023-09-03',
    Study: 'BCA',
    StartDate: '2023-09-03',
    EndDate: '2023-09-23',
    CurrentSalary: 50000,
    Description: '<p></p>',
  })

  useEffect(() => {
    // Fetch employees from the API when the component mounts
    axios
      .get('https://sweede.app/DeliveryBoy/Get-Employee/')
      .then((response) => {
        setEmployees(response.data)
      })
      .catch((error) => {
        console.error('Error fetching employees:', error)
      })
    console.log(employees, 'hii')
  }, [])

  const handleCancel = () => {
    setNewEmployee({})
  }

  // Event handler to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault() // Prevent the default form submission behavior
    setId(id + 1)

    setNewEmployee({
      id: id,
      FirstName: firstName,
      LastName: lastName,
      DOB: dob,
      Study: study,
      StartDate: startDate,
      EndDate: endDate,
      CurrentSalary: currentSalary,
      Description: description,
    })

    // Send a POST request to add a new employee
    axios
      .post('https://sweede.app/DeliveryBoy/Add-Employee/', newEmployee)
      .then((response) => {
        // Update the employees state with the new data
        setEmployees([...employees, response.data])
      })
      .catch((error) => {
        console.error('Error adding employee:', error)
      })
  }

  return (
    <Box
      sx={{
        width: '700px',
        padding: '66px',
      }}
    >
      <Typography
        sx={{
          width: '700px',
          padding: '66px',
          fontFamily: 'Montserrat',
          fontSize: '45px',
          fontWeight: '700',
          lineHeight: '63px',
          letterSpacing: '0px',
          textAlign: 'left',
          color: '#314363',
        }}
      >
        Employee Registration Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Typography
              htmlFor='firstName'
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
              First Name*
            </Typography>
            <TextField
              variant='standard'
              margin='normal'
              required
              fullWidth
              id='firstName'
              name='firstName'
              autoFocus
              onChange={(e) => setFirstName(e.target.value)}
              placeholder='Enter your name'
              sx={{
                width: '308px',
                background: '#F8FBFF',
              }}
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography
              htmlFor='lastName'
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
              Last Name*
            </Typography>
            <TextField
              variant='standard'
              margin='normal'
              required
              fullWidth
              id='lastName'
              name='lastName'
              autoFocus
              onChange={(e) => setLastName(e.target.value)}
              placeholder='Enter your name'
              sx={{
                width: '308px',
                background: '#F8FBFF',
                height: '54px',
                borderRadius: '16px',
              }}
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Grid>
        </Grid>

        <Grid>
          <Typography
            htmlFor='dob'
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
            DOB
          </Typography>
          <TextField
            variant='standard'
            margin='normal'
            type='date'
            fullWidth
            id='dob'
            name='dob'
            autoFocus
            onChange={(e) => setDob(e.target.value)}
            placeholder=''
            sx={{
              width: '659px',
              background: '#F8FBFF',
              height: '54px',
              borderRadius: '16px',
            }}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Grid>
        <Typography
          htmlFor='study'
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
          Study
        </Typography>
        <Select
          labelId='Select employee'
          id='study'
          value={study}
          label='Age'
          onChange={(e) => setStudy(e.target.value)}
          sx={{
            width: '659px',
            height: '54px',
            background: '#F8FBFF',
            border: '0px solid #FFFFFF',
            outline: 'none',
            boxShadow: 'none',
            '&:hover': {
              border: '0px solid #FFFFFF',
              outline: 'none',
              boxShadow: 'none',
            },
            '&:focus': {
              border: '0px solid #FFFFFF',
              outline: 'none',
              boxShadow: 'none',
            },
          }}
        >
          <MenuItem value={'B.E'}>B.E</MenuItem>
          <MenuItem value={'B.E<'}>BCA</MenuItem>
          <MenuItem value={'B.E<'}>B.Sc</MenuItem>
        </Select>

        <Grid container spacing={0}>
          <Grid item xs={6}>
            <Typography
              htmlFor='startDate'
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
              Start Date
            </Typography>
            <TextField
              variant='standard'
              margin='normal'
              type='date'
              fullWidth
              id='startDate'
              name='startDate'
              autoFocus
              onChange={(e) => setStartDate(e.target.value)}
              placeholder=''
              sx={{
                width: '288px',
                background: '#F8FBFF',
                height: '54px',
                borderRadius: '16px',
              }}
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography
              htmlFor='endDate'
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
              End Date
            </Typography>
            <TextField
              variant='standard'
              margin='normal'
              type='date'
              fullWidth
              id='endDate'
              name='endDate'
              autoFocus
              onChange={(e) => setEndDate(e.target.value)}
              placeholder=''
              sx={{
                width: '288px',
                background: '#F8FBFF',
                height: '54px',
                borderRadius: '16px',
              }}
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Grid>
        </Grid>
        <Typography
          htmlFor='currentSalary'
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
          Current Salary
        </Typography>
        <TextField
          variant='standard'
          margin='normal'
          type='number'
          fullWidth
          id='currentSalary'
          name='currentSalary'
          autoFocus
          onChange={(e) => setCurrentSalary(e.target.value)}
          placeholder=''
          sx={{
            width: '659px',
            background: '#F8FBFF',
            height: '54px',
            borderRadius: '16px',
          }}
          InputProps={{
            disableUnderline: true,
          }}
        />
        <Typography
          htmlFor='description'
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
          Description
        </Typography>
        <textarea
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              onClick={handleCancel}
              variant='contained'
              sx={{
                width: '297px',
                height: '69px',
                borderRadius: '13px',
                background: '#E3E3E3',
                color: '#263857',
                fontFamily: 'Montserrat',
                fontSize: '18px',
                letterSpacing: '0.01em',
                fontWeight: 700,
                lineHeight: '25px',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#E3E3E3',
                  boxShadow: 'none',
                  background: '#E3E3E3',
                  fontFamily: 'Montserrat',
                  fontSize: '18px',
                  letterSpacing: '0.01em',
                  fontWeight: 700,
                  lineHeight: '25px',
                  color: '#263857',
                },
                '&:disabled': {
                  boxShadow: 'none',
                  background: '#E3E3E3',
                  fontFamily: 'Montserrat',
                  fontSize: '18px',
                  letterSpacing: '0.01em',
                  fontWeight: 700,
                  lineHeight: '25px',
                  color: '#263857',
                },
              }}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              type='submit'
              variant='outlined'
              sx={{
                width: '297px',
                height: '69px',
                borderRadius: '13px',
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box mb={2}></Box>
      <EmployeeList />
      <Typography
        sx={{
          width: '700px',
          padding: '66px',
          fontFamily: 'Montserrat',
          fontSize: '45px',
          fontWeight: '700',
          lineHeight: '63px',
          letterSpacing: '0px',
          textAlign: 'left',
          color: '#314363',
        }}
      >
        Employee DropDown
      </Typography>
      <Grid container spacing={9}>
        <Grid item xs={6}>
          <EmployeeDropdown data={employees} />
        </Grid>
        <Grid item xs={6}>
          <DatePickerComponent />
        </Grid>
      </Grid>
    </Box>
  )
}

export default EmployeeRegistrationForm
