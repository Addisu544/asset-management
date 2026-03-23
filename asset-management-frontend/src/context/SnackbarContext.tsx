import { createContext, useContext, useState, type ReactNode } from "react";
import { Alert, Snackbar } from "@mui/material";

type SnackbarSeverity = "success" | "error" | "warning" | "info";

type SnackbarApi = {
  // Backwards-compatible API (existing code may call showMessage).
  showMessage: (msg: string, type?: SnackbarSeverity) => void;
  showSuccess: (msg: string) => void;
  showError: (msg: string) => void;
  showWarning: (msg: string) => void;
  showApiError: (error: unknown, fallback?: string) => void;
};

const SnackbarContext = createContext<SnackbarApi | null>(null);

export const useSnackbar = () => {
  const ctx = useContext(SnackbarContext);
  if (!ctx) throw new Error("useSnackbar must be used within SnackbarProvider");
  return ctx;
};

const extractErrorMessage = (error: any) => {
  // Handle axios-like errors: error.response.data might be string or object.
  const data = error?.response?.data ?? error?.data;

  if (typeof data === "string") return data;
  if (data && typeof data === "object") {
    return (
      data.message ??
      data.error ??
      data.title ??
      // Fall back to something human-readable.
      (data.detail ? String(data.detail) : JSON.stringify(data))
    );
  }

  if (error?.message) return String(error.message);
  return "Request failed";
};

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<SnackbarSeverity>("success");

  const showMessage = (msg: string, type: SnackbarSeverity = "success") => {
    setMessage(msg);
    setSeverity(type);
    setOpen(true);
  };

  const showSuccess = (msg: string) => showMessage(msg, "success");
  const showError = (msg: string) => showMessage(msg, "error");
  const showWarning = (msg: string) => showMessage(msg, "warning");

  const showApiError = (error: unknown, fallback = "Request failed") => {
    const msg = extractErrorMessage(error) || fallback;
    showError(msg === "Request failed" ? fallback : msg);
  };

  return (
    <SnackbarContext.Provider
      value={{ showMessage, showSuccess, showError, showWarning, showApiError }}
    >
      {children}

      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3500}
        onClose={() => setOpen(false)}
      >
        <Alert
          elevation={0}
          variant="filled"
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
