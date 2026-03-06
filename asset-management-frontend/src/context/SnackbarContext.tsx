import { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarContext = createContext<any>(null);

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }: any) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const showMessage = (msg: string, type = "success") => {
    setMessage(msg);
    setSeverity(type);
    setOpen(true);
  };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert severity={severity as any}>{message}</Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
