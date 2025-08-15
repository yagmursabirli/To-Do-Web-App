import React from 'react'
import { Button } from '@mui/material'
import {Box} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function Buttons({onOpenForm, onDeleteAll}) {

   
  return (
    <Box sx={{
        display: "flex",
        justifyContent: {md: "flex-end", sm: 'center', xs: 'center', lg: 'flex-end'},
        gap: "10px",
        marginTop:"15px",
        marginRight: {md:"13px", xs: 'auto'},
        padding: "5px",
        
        
    }}>
        <Box sx={{
            display: "flex",
            alignItems: "center"
        }}>
            
        <Button variant="contained" onClick={onOpenForm} sx={{
            color: "white",
            fonstSize: "300"
        }}><AddIcon sx={{ fontSize: "25px"}}/> Add New Task</Button>
        </Box>

        <Box sx={{
            display: "flex",
            alignItems: "center",
        }}>
         <Button variant="contained" onClick={onDeleteAll} sx={{
            color: "white",
            fonstSize: "300"
         }}><DeleteOutlineIcon sx={{ fontSize: "23px"}}/> Delete All Tasks</Button>
         </Box>
    </Box>
  )
}

export default Buttons