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
        console.log("res:", res);

        login({
          fullName: res?.data?.data?.first_name + res.data?.data?.last_name,
          first_name: res?.data?.data?.first_name,
          last_name: res.data?.data?.last_name,
          email: res?.data?.data?.email,
          phone: res?.data?.data?.phone,
          company_name: res?.data?.data?.company_name,
          phone_verified: res?.data?.data?.phone_verified,
          email_verified: res?.data?.data?.email_verified,
          alt_email: res?.data?.data?.alt_email,
          alt_phone: res?.data?.data?.alt_phone,
          alt_phone_code: res?.data?.data?.alt_phone_code,
        });
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
    // fetchUser();
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
