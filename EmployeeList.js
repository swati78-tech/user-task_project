import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import { DotsIcon } from '../Icons/DotsIcon'

function EmployeeList() {
  const [employees, setEmployees] = useState([])
  const [openBox, setOpenBox] = useState(false)
  const [newEmployee, setNewEmployee] = useState({}) // Employee data for adding
  const [selectedEmployee, setSelectedEmployee] = useState({}) // Employee data for updating

  const paperStyle = {
    width: '1230px',
    borderRadius: '30px',
    border: '1px',
  }
  const tableStyle = {
    borderRadius: '30px',
    border: '1px',
  }

  const headerCellStyle = {
    padding: '46px 16px 16px 16px',
  }

  const rowStyle = {
    height: '80px',
    fontFamily: 'Montserrat',
    fontSize: '13px',
    lineHeight: '18px',
    letterSpacing: '0.01em',
    textAlign: 'left',
    color: '#7E98BA',
  }
  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios
      .get('https://sweede.app/DeliveryBoy/Get-Employee/')
      .then((response) => {
        setEmployees(response.data)
      })
      .catch((error) => {
        console.error('Error fetching employees:', error)
      })
  }, []) // Empty dependency array to run the effect only once

  const handleIconClick = () => {
    setOpenBox(!openBox)
  }
  const updateEmployee = (id) => {
    // Send a PUT request to update an employee
    axios
      .put(
        `https://sweede.app/DeliveryBoy/update-Employee/${id}`,
        selectedEmployee
      )
      .then((response) => {
        // Update the employees state with the updated data
        const updatedEmployees = employees.map((employee) => {
          if (employee.id === id) {
            return response.data
          }
          return employee
        })
        setEmployees(updatedEmployees)
      })
      .catch((error) => {
        console.error('Error updating employee:', error)
      })
  }

  const deleteEmployee = (id) => {
    // Send a DELETE request to delete an employee
    axios
      .delete(`https://sweede.app/DeliveryBoy/delete-Employee/${id}`)
      .then(() => {
        // Remove the deleted employee from the employees state
        const updatedEmployees = employees.filter(
          (employee) => employee.id !== id
        )
        setEmployees(updatedEmployees)
      })
      .catch((error) => {
        console.error('Error deleting employee:', error)
      })
  }

  return (
    <>
      <Typography
        sx={{
          width: '700px',
          padding: '66px',
          fontFamily: 'Montserrat',
          fontSize: '45px',
          fontWeight: '700',
          lineHeight: '63px',
          letterSpacing: '0px',
          textAlign: 'center',
          color: '#314363',
        }}
      >
        Employee List
      </Typography>
      <Paper style={paperStyle}>
        <Table style={tableStyle}>
          <TableHead>
            <TableRow>
              <TableCell style={headerCellStyle}>Name</TableCell>
              <TableCell style={headerCellStyle}>DOB</TableCell>
              <TableCell style={headerCellStyle}>Start Date</TableCell>
              <TableCell style={headerCellStyle}>End Date</TableCell>
              <TableCell style={headerCellStyle}>Description</TableCell>
              <TableCell style={headerCellStyle}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id} style={rowStyle}>
                <TableCell>
                  {employee.FirstName + ' ' + employee.LastName}
                </TableCell>
                <TableCell>{employee.DOB}</TableCell>
                <TableCell>{employee.StartDate}</TableCell>
                <TableCell>{employee.EndDate}</TableCell>
                <TableCell>{employee.Description}</TableCell>
                <TableCell>
                  <IconButton onClick={handleIconClick}>
                    <DotsIcon></DotsIcon>
                  </IconButton>
                  {openBox && (
                    <List>
                      <ListItem style={{ cursor: 'pointer' }}>
                        <ListItemText
                          primary='View'
                          sx={{
                            color: '#DAE2EF',
                            fontFamily: 'Montserrat',
                            fontSize: '13px',
                            fontWeight: '500',
                            lineHeight: '18px',
                            marginRight: '10px',
                          }}
                        />
                        <DotsIcon />
                      </ListItem>
                      <ListItem style={{ cursor: 'pointer' }}>
                        <ListItemText
                          primary='Edit'
                          sx={{
                            color: '#DAE2EF',
                            fontFamily: 'Montserrat',
                            fontSize: '13px',
                            fontWeight: '500',
                            lineHeight: '18px',
                            marginRight: '10px',
                          }}
                          onClick={updateEmployee(employee.id)}
                        />
                        <DotsIcon />
                      </ListItem>
                      <ListItem style={{ cursor: 'pointer' }}>
                        <ListItemText
                          primary='Delete'
                          sx={{
                            color: '#DAE2EF',
                            fontFamily: 'Montserrat',
                            fontSize: '13px',
                            fontWeight: '500',
                            lineHeight: '18px',
                            marginRight: '10px',
                          }}
                          onClick={deleteEmployee(employee.id)}
                        />
                        <DotsIcon />
                      </ListItem>
                    </List>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  )
}

export default EmployeeList
