import React from 'react'
import { AppBar, Toolbar, Typography, Container,  Box, Button, styled } from '@mui/material'

import EventNoteIcon from '@mui/icons-material/EventNote';

const StyledToolbar = styled(Toolbar)({
    display:"flex",
    justifyContent:"space-between",
    alignItems: "center",
    paddingRight: "0px",
    paddingLeft: "0px",
    color: "white"
})

function Navbar() {
   
  return (
    <div>
        <AppBar position="sticky" color="primary" >
                <StyledToolbar>
                    <Box sx={{display:"flex", alignItems:"center"}}>
                      <EventNoteIcon sx={{fontSize:"40px", marginRight:"15px"}}/> 
                    <Typography variant="h4" color='white' sx={{fontSize:{
                        xs: "23px",
                        sm:"35px",
                        md: "40px",
                        lg: "43px"
                    },
                    fontWeight: "300"
                    }}>
                      
                    To Do App
            </Typography>
            </Box>
            <Typography variant="h6" color="white" sx={{
                fontSize:{
                        xs: "15px",
                        sm:"17px",
                        md: "20px",
                        lg: "20px"
                },
                marginBottom: "0px",
                fontWeight: "200"
            }}>
                Plan your tasks...
            </Typography>
          </StyledToolbar>
        </AppBar>
    </div>
  )
}

export default Navbar