import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "@fontsource/roboto";
import { SnackbarProvider } from "./context/SnackbarContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </React.StrictMode>,
);
