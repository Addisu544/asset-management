import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "@fontsource/roboto";
import { SnackbarProvider } from "./context/SnackbarContext";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./app/theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
