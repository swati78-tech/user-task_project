import React, { useState } from 'react'
import {
  Box,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Popover,
  InputBase,
  Divider,
  Typography,
} from '@mui/material'
import { SearchIcon } from '../Icons/SearchIcon'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

const EmployeeDropdown = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])
  const [searchText, setSearchText] = useState('')
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelectAll = () => {
    if (selectedItems.length === data.length) {
      setSelectedItems([])
    } else {
      setSelectedItems([...data])
    }
  }

  const handleItemClick = (item) => {
    const selectedIndex = selectedItems.indexOf(item)
    let newSelected = [...selectedItems]

    if (selectedIndex === -1) {
      newSelected.push(item)
    } else {
      newSelected.splice(selectedIndex, 1)
    }

    setSelectedItems(newSelected)
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }
  const filteredData =
    searchText.length !== 0
      ? data.filter((item) =>
          item.FirstName.toLowerCase().includes(searchText.toLowerCase())
        )
      : data

  return (
    <>
      <Typography
        htmlFor='empdropdown'
        sx={{
          fontFamily: 'Montserrat',
          fontSize: '13px',
          fontWeight: '500',
          lineHeight: '18px',
          letterSpacing: '0.01em',
          textAlign: 'left',
          color: '#263857',
          mb: '16px',
        }}
      >
        Select employee dropdown
      </Typography>
      <Box
        sx={{
          width: '376px',
          height: '54px',
          borderRadius: '16px',
          background: '#F8FBFF',
        }}
      >
        <IconButton
          sx={{
            marginLeft: '300px',
          }}
          onClick={handleClick}
          size='small'
        >
          {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </IconButton>
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Paper
          sx={{
            width: '376px',
            height: '390px',
            border: '1px solid #3C4E6F',
            background: '#142A51',
          }}
        >
          <Box p={0.5}>
            <InputBase
              placeholder='Search employee...'
              value={searchText}
              onChange={handleSearchChange}
              startAdornment={<SearchIcon />}
              sx={{
                background: '#1C3663',
                color: '#6F8BBC',
                width: '368px',
                height: '40px',
                padding: '0 0 0 16px',
                fontFamily: 'Montserrat',
                fontSize: '13px',
                fontWeight: '400',
                lineHeight: '18px',
              }}
            />
            <Divider />
            <List>
              <ListItem onClick={handleSelectAll} style={{ cursor: 'pointer' }}>
                <Box
                  sx={{
                    background: '#DAE2EF',
                    borderRadius: '33px',
                    width: '20px',
                    height: '20px',
                    mr: '12px',
                    textAlign: 'center',
                  }}
                >
                  {selectedItems.length}
                </Box>
                <ListItemText
                  primary='All employee'
                  sx={{
                    color: '#DAE2EF',
                    fontFamily: 'Montserrat',
                    fontSize: '13px',
                    fontWeight: '500',
                    lineHeight: '18px',
                  }}
                />
                <ListItemIcon>
                  <Checkbox
                    checked={
                      selectedItems.length === data.length && data.length > 0
                    }
                    disableRipple
                  />
                </ListItemIcon>
              </ListItem>
              {filteredData.length !== 0 ? (
                filteredData.map((item) => (
                  <ListItem
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Box
                      sx={{
                        background: '#DAE2EF',
                        borderRadius: '33px',
                        width: '20px',
                        height: '20px',
                        mr: '12px',
                      }}
                    ></Box>
                    <ListItemText
                      primary={item.FirstName + ' ' + item.LastName}
                      sx={{
                        color: '#DAE2EF',
                        fontFamily: 'Montserrat',
                        fontSize: '13px',
                        fontWeight: '500',
                        lineHeight: '18px',
                      }}
                    />
                    <ListItemIcon>
                      <Checkbox
                        checked={selectedItems.includes(item)}
                        disableRipple
                      />
                    </ListItemIcon>
                  </ListItem>
                ))
              ) : (
                <Typography
                  sx={{
                    color: '#DAE2EF',
                    fontFamily: 'Montserrat',
                    fontSize: '13px',
                    fontWeight: '500',
                    lineHeight: '18px',
                    padding: '0 0 0 16px',
                  }}
                >
                  Not Found
                </Typography>
              )}
            </List>
          </Box>
        </Paper>
      </Popover>
    </>
  )
}

export default EmployeeDropdown
