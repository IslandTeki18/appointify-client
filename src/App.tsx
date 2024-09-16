import * as React from "react";
import { AppRoutes } from "./routes/index";
import { AuthProvider } from "./contexts/AuthContext";

export function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
