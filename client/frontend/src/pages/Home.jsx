import { Box, Button, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, ThemeProvider } from '@mui/material'
import React from 'react'
import Navbar from '../components/Navbar'
import Buttons from '../components/Buttons'
import Cards from '../components/Cards'
import theme from '../assets/theme'
import TaskList from '../components/TaskList';
import { useState } from 'react'

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const STATUS_OPTIONS = ['Pending', 'In Progress', 'Completed'];
const PRIORITY_OPTIONS = ['low', 'medium', 'high'];

function Home() {

   const [open, setOpen] = React.useState(false);
  
       const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
      const handleSave = () => setOpen(false);

      const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        status: 'Pending',
        priority: 'medium',
        dueDate: null,
      });

       const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTask((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

      const handleDateChange = (NewDate) => {
        setNewTask((prev) => ({
          ...prev, 
          dueDate: NewDate,
        }));
      };
  return (
     <ThemeProvider theme={theme}> 
      <CssBaseline />
      <Box sx={{backgroundColor: 'background.default', minHeight: '100vh'}}>
      <Navbar/>
      <Buttons onOpenForm={handleOpen}/>
      <TaskList/>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New To Do</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSave} id="subscription-form">
            <Box sx={{display: "flex", flexDirection: "column", gap:2,}}>
            <TextField
              id="title"
              label="Title"
              sx={{marginTop: 3}}
            />
             <TextField
              id="description"
              label="To Do Descripton"
              sx={{marginBottom: 3}}
            />
          </Box>
          {/* 3 alan: aynı satır, aynı boyut */}
<Box
  sx={{
    display: "grid",
    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" }, // mobilde tek sütun, >=sm'de 3 sütun
    gap: 2,
    alignItems: "start",
  }}
>
  
  <FormControl fullWidth size="small">
    <InputLabel>Status</InputLabel>
    <Select
      name="status"
      label="Status"
      value={newTask.status}
      onChange={handleChange}
    >
      {STATUS_OPTIONS.map((status) => (
        <MenuItem key={status} value={status}>
          {status}
        </MenuItem>
      ))}
    </Select>
  </FormControl>

 
  <FormControl fullWidth size="small">
    <InputLabel>Priority</InputLabel>
    <Select
      name="priority"
      label="Priority"
      value={newTask.priority}
      onChange={handleChange}
    >
      {PRIORITY_OPTIONS.map((priority) => (
        <MenuItem key={priority} value={priority}>
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </MenuItem>
      ))}
    </Select>
  </FormControl>


  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DatePicker
      label="Due Date"
      value={newTask.dueDate}
      onChange={handleDateChange}
      slotProps={{
        textField: { fullWidth: true, size: "small" }, 
      }}
    />
  </LocalizationProvider>
</Box>


          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
    </ThemeProvider>
  )
}

export default Home