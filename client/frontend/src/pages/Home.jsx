import React, { useEffect, useState } from 'react'
import {ThemeProvider, CssBaseline, Box, Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, DialogActions, Button} from '@mui/material'
import theme from '../assets/theme'
import Navbar from '../components/Navbar'
import Buttons from '../components/Buttons'
import TaskList from '../components/TaskList'

//takvim
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//adaptee
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; 
//adapter, localizationProvider'a verilir adapte olması için
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

//status and priority options
const STATUS_OPTIONS = ['pending', 'in_progress', 'completed'];
const PRIORITY_OPTIONS = ['low', 'medium', 'high'];

function Home() {

  const [tasks, setTasks] = useState([]);

  //dialogu açıp kapatmak için add new task butonunda
  const [open, setOpen] = useState();
  //form her defasında temiz gelsin diye 
  const handleOpen = () => {
    setNewTask({
       title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: null
    });
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  //new task
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: null
  });

  //apiye request atıp taskleri alır
  const fetchTasks = async () => { 
    try {
      const res = await fetch('http://localhost:5000/api/tasks');
      //response başarılı mı bak
      if (!res.ok) {
        throw new Error("error while data fetch")
      }
      //jsonı js objesine  çevir -- data
      const data = await res.json();
      //set et
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  }

  //component mount olunca çalışır
  useEffect(() => {
    fetchTasks();
  }, []);


  //dbden ve uidan siler
  function handleDelete(id){
    fetch(`http://localhost:5000/api/tasks/${id}`,
      {method: 'DELETE'})
      .then(res => {
        if (!res.ok) {
          throw new Error("error while delete");
        }
        setTasks(prev => prev.filter(t => t.id !== id));
      })
      .catch(err => console.error(err));
  }

  //dbde ve uida değiştirir
  function handleStatusChange(id, newStatus){
    fetch(`http://localhost:5000/api/tasks/${id}/status`, {
      method: "PATCH",
      //json olarak veri yollandığını söyler
      headers: {"Content-Type": "application/json"},
      //requestin bodysi, obejecti json stringe çevirir
      body: JSON.stringify({status: newStatus})
    })
    .then(res => {
      if (!res.ok) {
        throw new Error("status update error");
        }
        //ui güncellemesi
        setTasks(prev => 
          prev.map(t => t.id === id ? {...t, status: newStatus} : t)
        );
      
    })
    .catch(err => console.error(err));

  }

  //handle change method
  function handleChange(e){
    const {name, value} = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name] : value,
    }));
  }

  //date change
  function handleDateChange(newDate) {
    setNewTask((prev) => ({
      ...prev,
      dueDate: newDate,
    }))
  }

  //save functionality
  async function handleSave(e) {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      if (!res.ok) {
        throw new Error('error while adding new to do');
      }
      const addedTask = await res.json();

      setTasks((prevTasks) => [addedTask, ...prevTasks]);

      handleClose();
    } catch (error) {
      console.error('error while adding a new to do', error);
    }
  }
  
  //delete all functionality
  function handleDeleteAll() {
    fetch('http://localhost:5000/api/tasks', {
      method: 'DELETE',
    })
    .then(res => {
      if (!res.ok) {
        throw new Error("error while deleting all tasks")
      }
      setTasks([]);
    })
    .catch(err => console.error(err));
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Box sx={{backgroundColor: 'background.default', minHeight: '100vh'}} >
      <Navbar/>
      <Buttons onOpenForm={handleOpen} onDeleteAll={handleDeleteAll}/>
      <TaskList tasks={tasks} setTasks={setTasks} onDelete={handleDelete} onStatusChange={handleStatusChange} />
      
      { /* add new task part */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New To Do</DialogTitle>
        <DialogContent>
          <form action="">
            {/* title and description */}
            <Box sx={{display: "flex", flexDirection: "column", gap:2, marginY: 3}}>
              <TextField
              name='title'
              id='title'
              label='Title of To Do'
              value={newTask.title}
              onChange={handleChange}
              />
              <TextField
              name='description'
              id='description'
              label='Description'
              value={newTask.description}
              onChange={handleChange}
              /> 
            </Box>
            {/* status, priority and due date */}
            <Box sx={{display: "grid", gridTemplateColumns: {xs: "1fr", sm: "1fr 1fr 1fr"},
          gap: 2, alignItems: "start"}}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  label="status"
                  value={newTask.status}
                  onChange={handleChange}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                name='priority'
                label='priority'
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
                />
              </LocalizationProvider>
            </Box>
          </form>
        </DialogContent>

        {/* cancel ve save butonları */}
        <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button  onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
      </Box>
    </ThemeProvider>
  )
}

export default Home