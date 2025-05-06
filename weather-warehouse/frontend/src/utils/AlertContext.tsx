import { Alert, Snackbar } from "@mui/material";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { AlertContextType } from "../types/alertContext.type";


export const AlertContext = createContext<AlertContextType>({
  showAlert: () => { },
});


export function AlertProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"error" | "info" | "success" | "warning">("info");

  function showAlert(newMessage: string, newSeverity: "error" | "info" | "success" | "warning" = "info") {
    setMessage(newMessage);
    setSeverity(newSeverity);
    setOpen(true);
  }

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
        <Alert severity={severity} onClose={() => setOpen(false)}>
          {message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
}

export const useAlert = () => useContext(AlertContext);
