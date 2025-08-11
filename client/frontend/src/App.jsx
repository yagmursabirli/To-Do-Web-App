import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import React from 'react'
import Navbar from './components/Navbar'
import theme from './assets/theme'
import { ThemeProvider } from '@mui/material/styles'
import { Box } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  return (
    <>
    
    <ThemeProvider theme={theme}> 
      <CssBaseline />
      <Box sx={{backgroundColor: 'background.default', minHeight: '100vh'}}>
      <Navbar/>
      </Box>
    </ThemeProvider>
    
    </>
  )
}

export default App