import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: '#71a364',
        },
        secondary: {
            main: '#FFF'
        },
        background:{
            default:'#dcfcd4',
            cards: '#cfdbcc',
        }
    },
    typography:{
        fontFamily: "'Montserrat', sans-serif",
        
    }
})

export default theme