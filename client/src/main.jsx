import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react"
import App from "./App.jsx"
import ReactDOM from "react-dom/client";
const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
