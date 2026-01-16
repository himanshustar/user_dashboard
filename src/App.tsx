import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import DashboardLayout from "./components/layout/DashboardLayout";
import EditProfile from "./pages/EditProfile";
import { Toaster } from "react-hot-toast";
import NotificationPage from "./pages/NotificationPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/login" element={<LoginPage />} />

          {/* PROTECTED ROUTES */}
          <Route element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Navigate to="/bookings" replace />} />
              <Route path="/bookings" element={<Dashboard />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/notifications" element={<NotificationPage />} />
              <Route path="/change-password" element={<ChangePasswordPage />} />
              {/* <Route path="/home" element={<Dashboard />} />
              <Route path="/queries" element={<Dashboard />} />
              <Route path="/discover" element={<Dashboard />} /> */}
            </Route>
          </Route>
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2000,
            style: {
              background: "#0f172a",
              color: "#fff",
              border: "1px solid #1e293b",
            },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}
