// src/components/Cards.jsx
import {
  Card, CardContent, CardActions, Typography, Chip,
  Button, Stack, TextField, MenuItem,
  CardHeader, Box,
  IconButton,
  Menu
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import React, { useEffect, useState } from "react"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const STATUS = ["pending", "in_progress", "completed"]
const STATUS_LABELS = {
    pending: "Pending",
    in_progress: "In Progress",
    completed: "Completed",
}

export default function Cards({ task, onDelete, onStatusChange, onUpdate}) {
  const nav = useNavigate()
  const due = task?.dueDate ? new Date(task.dueDate).toLocaleDateString() : "—--"

  const [anchorEl, setAnchorEl] = useState(null)
  const [status, setStatus] = useState(task?.status ?? "pending")
  const menuOpen = Boolean(anchorEl)

  
  useEffect(() => {
    setStatus(task?.status ?? "pending")
  }, [task?.status])

  const openMenu = (e) => setAnchorEl(e.currentTarget)
  const closeMenu = () => setAnchorEl(null)

  const handleStatusPick = async (newStatus) => {

    setStatus(newStatus)
    closeMenu()
    
    await onStatusChange?.(task.id, newStatus)
  }
  return (
    <Card sx={{ width: 340, minHeight: 280, m: 2, p: 0 ,borderRadius: 2,  backgroundColor: "#f0fced"}} variant="outlined">
      <CardContent>
       <CardHeader
  action={
    <Stack direction="row" spacing={1}>
      <IconButton onClick={() => onUpdate?.(task.id)}>
        <EditIcon sx={{fontSize: "20px"}}/>
      </IconButton>
      <IconButton onClick={() => onDelete?.(task.id)}>
        <DeleteOutlineIcon sx={{fontSize: "20px"}} />
      </IconButton>
    </Stack>
  }
  title={
    <Typography variant="h6" gutterBottom noWrap>
      {task?.title || "Untitled"}
    </Typography>
  }
/>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 10 }} noWrap>
          {task?.description || "No description"}
        </Typography>
      </CardContent>


      <CardActions>
            <Stack 
            direction= "row"
            spacing={0.3}
            alignItems="center"
            flexWrap="noWrap"
            marginBottom= "0px"
            marginX="auto">
        
          <Chip
            label={
            <Stack direction="row" spacing={0.3} alignItems="center">
             {STATUS_LABELS[status] || status}
            <KeyboardArrowDownIcon fontSize="small" />
            </Stack>
             }
            onClick={openMenu}
            clickable
            color={status === "completed" ? "success" : status === "in_progress" ? "warning" : "default"}
            variant="outlined"
          />
          <Menu anchorEl={anchorEl} open={menuOpen} onClose={closeMenu}>
            {STATUS.map((s) => (
              <MenuItem
                key={s}
                selected={s === status}
                onClick={() => handleStatusPick(s)}
              >
                 {STATUS_LABELS[s] || s}
              </MenuItem>
            ))}
          </Menu>

         <Chip
            label={
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 1.5 }}>
                <Typography variant="caption" sx={{ lineHeight: 1, fontWeight: 10, fontWeight: "medium" }}>Due date:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 'normal', fontSize: 10}}>{due}</Typography>
                </Box>
            }
            />
          <Chip
            label={`${task?.priority}`}
            color={task?.priority === "high" ? "error" : task?.priority === "medium" ? "warning" : "default"}
            variant="outlined"
          />
        </Stack>
      </CardActions>
    
    </Card>
  )
}
