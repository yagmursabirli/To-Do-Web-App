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


const STATUS = ["pending", "in_progress", "completed"];
const STATUS_LABELS = {
    pending: "Pending",
    in_progress: "In Progress",
    completed: "Completed",
}

export default function Cards({ task, onDelete, onStatusChange, onUpdate}) {
  const nav = useNavigate()
  const due = task?.dueDate ? new Date(task.dueDate).toLocaleDateString() : "----"

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
   <Card sx={{
    width: 340,
    minHeight: 280,
    m: 2,
    p: 0,
    borderRadius: 2,
    backgroundColor: "#f0fced",
    display: 'flex',
    flexDirection: 'column',
    marginX: {xs: 'auto', sm: 'auto', md:'20px', lg: '20px'}
    
   }}
   variant="outlined"
   >
    <CardHeader sx={{
      alignItems: 'flex-start',
      //uzun title gelince buttonların konumunu korumak için aşağıya iner
      ".MuiCardHeader-content": { minWidth: 0 },
      ".MuiCardHeader-action": { alignSelf: 'flex-start', mt: 0 },
          pb: 0.5,
    }}
    
    action={
      // edit and delete buttons
      <Stack direction="row" spacing={1}>
        <IconButton onClick={() => onUpdate?.(task)}>
          <EditIcon/>
        </IconButton>

        <IconButton onClick={() => onDelete?.(task.id)}>
          <DeleteOutlineIcon/>
        </IconButton>
      </Stack>
    }
    //title of the task
    title={
      <Typography
       variant="h6"
       //gutterbottom mb ekler
       gutterBottom
       //text taşınca ... eklemez, alta geçer
       noWrap={false}
       sx={{
        //kelimeyi bölmek için
        overflowWrap: 'anywhere',
        wordBreak: 'break-word',
       }}
      >
        {task?.title || "Untitled To Do"}
      </Typography>
    }
    />
    {/* to do description */}
    <CardContent sx={{ pt: 1, flexGrow: 1}}>
      <Typography 
        variant="body2"
        color="text.secondary"
        sx={{
          mb: 2,
          whiteSpace: 'normal',
          overflow: 'hidden',
          // max 5 satır gösterir
          display: '-webkit-box',
          WebkitLineClamp: 5,
          WebkitBoxOrient: 'vertical',
        }}
      > 
        {task?.description || "No description"}
      </Typography>
    </CardContent>
    {/* status, priority ve due date */}
    <CardActions sx={{ pt: 0 }}>
        <Stack
          direction="row"
          spacing={0.8}
          alignItems="center"
          flexWrap="wrap"
          marginX="auto"
          marginBottom= "0px"
          sx={{ mx: 'auto', rowGap: 1 }}
        >
          <Chip
            label={
              <Stack direction="row" spacing={0.3} alignItems="center" >
                {STATUS_LABELS[status] || status}
                <KeyboardArrowDownIcon fontSize="small" />
              </Stack>
            }
            onClick={openMenu}
            clickable
            color={status === "completed" ? "success" : status === "in_progress" ? "warning" : "default"}
            variant="outlined"
            sx={{
              width: '110px'
            }}
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
            label={`${task?.priority}`}
            sx={{
              backgroundColor:
                task?.priority === "high" ? '#bc4749'
                :task?.priority === 'medium' ? '#6a994e'
                : '#81b29a',
                color: "white",
                width: '88px'
            }}
            variant="outlined"
          />

          <Chip
            label={
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 1 }}>
                <Typography variant="caption" sx={{ lineHeight: 1, fontWeight: 500 }}>
                  Due date:
                </Typography>
                <Typography variant="body2" sx={{ fontSize: 10 }}>
                  {due}
                </Typography>
              </Box>
            }
            sx={{ bgcolor: 'action.hover',
              width: '90px'
             }}
          />

          
        </Stack>
      </CardActions>



   </Card>
  );
}