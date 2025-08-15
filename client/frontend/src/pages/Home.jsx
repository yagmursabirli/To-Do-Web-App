import React, { useEffect, useState } from 'react'
import {ThemeProvider, CssBaseline, Box, Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, DialogActions, Button} from '@mui/material'
import theme from '../assets/theme'
import Navbar from '../components/Navbar'
import Buttons from '../components/Buttons'
import TaskList from '../components/TaskList'

import FormDialog from '../components/FormDialog'

//status and priority options
const STATUS_OPTIONS = ['pending', 'in_progress', 'completed'];
const PRIORITY_OPTIONS = ['low', 'medium', 'high'];

function Home() {

  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  //dialogu açıp kapatmak için add new task butonunda 
  const [open, setOpen] = useState();
  //form her defasında temiz gelsin diye 
  const handleOpen = () => {
    //formun edit için değil yeni task için açıldığını söyler
    setEditingTask(null);
    setNewTask({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: null
    });
    setOpen(true);
  }

  //edit için dialogu açma
  const handleOpenForEdit = (task) => {
    setEditingTask(task);

    const taskWDateObject = {
      ...task, 
      dueDate: task.dueDate ? new Date(task.dueDate) : null,
    };
    setNewTask(taskWDateObject);
    setOpen(true);
  }


  const handleClose = () => {
    setOpen(false);
    setEditingTask(null);
  };

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

  //save functionality for new task and update
  async function handleSave(e) {
    e.preventDefault();
    try {
      if (editingTask) {
        const res = await fetch(`http://localhost:5000/api/tasks/${editingTask.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(newTask),
        });
        if (!res.ok) throw new Error('error while updating new to do');
        const updatedTask = await res.json();
        setTasks(prev => prev.map(t => (t.id === updatedTask.id ? updatedTask : t)));
      } else{
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
    }
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
      <TaskList tasks={tasks} setTasks={setTasks} onDelete={handleDelete} onStatusChange={handleStatusChange} onUpdate={handleOpenForEdit} />
 
      { /* add new task and update a taskpart */}
      <FormDialog tasks={newTask} open={open} onClose={handleClose} onChange={handleChange} onDateChange={handleDateChange} onSave={handleSave} isEditing={!!editingTask}/>
      </Box>
    </ThemeProvider>
  )
}

export default Home