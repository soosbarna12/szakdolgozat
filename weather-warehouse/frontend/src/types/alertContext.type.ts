export type AlertContextType = {
  showAlert: (message: string, severity?: "error" | "info" | "success" | "warning") => void;
};