import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'

//takvim
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//adaptee
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; 
//adapter, localizationProvider'a verilir adapte olması için
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TaskList from './TaskList';


//status and priority options
const STATUS_OPTIONS = ['pending', 'in_progress', 'completed'];
const PRIORITY_OPTIONS = ['low', 'medium', 'high'];

function FormDialog( {tasks, open, onClose, onChange, onDateChange, onSave, isEditing}) {
  return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>{isEditing ? "Edit Task" : "New Task"}</DialogTitle>
        <DialogContent>
          <form>
            {/* title and description */}
            <Box sx={{display: "flex", flexDirection: "column", gap:2, marginY: 3}}>
              <TextField
              name='title'
              id='title'
              label='Title'
              value={tasks.title}
              onChange={onChange}
              />
              <TextField
              name='description'
              id='description'
              label='Description'
              value={tasks.description}
              onChange={onChange}
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
                  value={tasks.status}
                  onChange={onChange}
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
                value={tasks.priority}
                onChange={onChange}
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
                value={tasks.dueDate}
                onChange={onDateChange}
                />
              </LocalizationProvider>
            </Box>
          </form>
        </DialogContent>

        {/* cancel ve save butonları */}
        <DialogActions>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button  onClick={onSave}>Save</Button>
        </DialogActions>
      </Dialog>
  )
}

export default FormDialog
