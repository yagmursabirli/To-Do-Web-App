import { Box, Button, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, ThemeProvider } from '@mui/material'
import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Buttons from '../components/Buttons'
import Cards from '../components/Cards'
import theme from '../assets/theme'
import TaskList from '../components/TaskList';
import { useState } from 'react'

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const STATUS_OPTIONS = ['pending', 'in_progress', 'completed'];
const PRIORITY_OPTIONS = ['low', 'medium', 'high'];

function Home() {

      const [open, setOpen] = React.useState(false);
      const [tasks, setTasks] = useState();
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);

      const fetchTasks = async () => {
        try {
          const res = await fetch('http://localhost:5000/api/tasks');
          if(!res.ok) throw new Error("data fetch error");
          const data = await res.json();
          setTasks(data);
        } catch (error) {
          console.error(error);
        }
      }

      useEffect(() => {
        fetchTasks();
      }, []);
    

      const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        status: 'pending',
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

      const handleSave = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch('http://localhost:5000/api/tasks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
          });
          if (!res.ok){
            throw new Error('Failed to add new task');
          }
          const addedTask = await res.json();

          setTasks((prevTasks) => [...prevTasks, addedTask]);

          handleClose();
        } catch (error) {
          console.error('error while adding a new task: ', error);
        }
      }

      function handleDelete(id) {
        fetch(`http://localhost:5000/api/tasks/${id}`, { method: "DELETE" })
            .then(res => {
                if (!res.ok) throw new Error("Silme hatası");
                setTasks(prev => prev.filter(t => t.id !== id));
            })
            .catch(err => console.error(err));
    }

      function handleStatusChange(id, newStatus) {
        fetch(`http://localhost:5000/api/tasks/${id}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus })
        })
            .then(res => {
                if (!res.ok) throw new Error("Güncelleme hatası");
                setTasks(prev =>
                    prev.map(t => t.id === id ? { ...t, status: newStatus } : t)
                );
            })
            .catch(err => console.error(err));
    }
  return (

    
     <ThemeProvider theme={theme}> 
      <CssBaseline />
      <Box sx={{backgroundColor: 'background.default', minHeight: '100vh'}}>
      <Navbar/>
      <Buttons onOpenForm={handleOpen}/>
      <TaskList
                tasks={tasks}
                setTasks={setTasks}
            />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New To Do</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSave} id="addTAsk-form">
            <Box sx={{display: "flex", flexDirection: "column", gap:2, }}>
            <TextField
              name='title'
              id="title"
              label="Title"
              value={newTask.title}
              onChange={handleChange}
              sx={{marginTop: 3}}
            />
             <TextField
              id="description"
              label="To Do Descripton"
              name='description'
              value={newTask.description}
              onChange={handleChange}
              sx={{marginBottom: 3}}
            />
          </Box>
  
<Box
  sx={{
    display: "grid",
    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
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
         {status.charAt(0).toUpperCase() + status.slice(1)}
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

          <Button onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
    </ThemeProvider>
  )
}

export default Home