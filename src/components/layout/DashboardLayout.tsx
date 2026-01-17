import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import axiosInstance from "../../api/axios";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(
          "https://buyer-dash.starclinch.com/auth/user/"
        );
        login(res?.data);
      } catch (error: any) {
        console.error("User fetch failed", error);

        // 🔴 cookie invalid / session expired
        logout();
        navigate("/login");
      }
    };

    // fetch only if not already in context
    if (!user) {
      fetchUser();
    }
  }, [user, login, logout, navigate]);

  const handleToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Sidebar isOpen={sidebarOpen} onClose={handleClose} />

      <div
        className={`
        flex-1 flex flex-col min-h-screen w-full transition-all duration-300
        ${sidebarOpen ? "lg:pl-72" : "lg:pl-0"}
      `}
      >
        <Header onMenuClick={handleToggle} sidebarOpen={sidebarOpen} />

        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
