import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"

// MUI
import { StyledEngineProvider, ThemeProvider, createTheme } from "@mui/material/styles"
// Roboto (opsiyonel, MUI default font)
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { BrowserRouter } from "react-router-dom"

const theme = createTheme({
  palette: { mode: "light" }, // dark yaparsan: "dark"
  // İsteğe bağlı: tipografi, spacing, palette genişletmeleri
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
)
