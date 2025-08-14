import React from 'react'
import {Box} from '@mui/material'
import Cards from '../components/Cards'

function TaskList({tasks, onDelete, onStatusChange}) {
  return (
    <Box sx={{ display: "flex", flexWrap:"wrap"}}>
        {tasks.map(task =>(
            <Cards
                key = {task.id}
                task = {task}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
            />
        ))}
    </Box>
  )
}

export default TaskList