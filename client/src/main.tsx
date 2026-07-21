import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App";
import { SidebarProvider } from "./context/SidebarContext";
import { ThemeProvider } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
  <BrowserRouter>
  <ThemeProvider>
    <SidebarProvider>
      <NotificationProvider>
        <App />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
          }}
        />
      </NotificationProvider>
    </SidebarProvider>
  </ThemeProvider>
</BrowserRouter>
  </StrictMode>
);