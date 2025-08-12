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
import Buttons from './components/Buttons'
import Cards from './components/Cards'
import Home from './pages/Home'

function App() {
  return (
    <>
    
    <ThemeProvider theme={theme}> 
     <Home/>
    </ThemeProvider>
    
    </>
  )
}

export default App