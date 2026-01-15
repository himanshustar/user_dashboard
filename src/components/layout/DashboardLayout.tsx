import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="content">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
