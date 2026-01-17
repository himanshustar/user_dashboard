import {
  Home,
  Bell,
  Search,
  Calendar,
  Edit,
  Lock,
  Compass,
  LogOut,
  X,
  Zap,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import useIsMobile from "../../hooks/useMediaQuery";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const isMobile = useIsMobile();

  const menuItems = [
    { icon: Home, label: "Home", path: "/bookings?tab=my_queries" },
    { icon: Bell, label: "My Notifications", path: "/notifications" },
    { icon: Search, label: "My Queries", path: "/bookings?tab=my_queries" },
    { icon: Calendar, label: "My Bookings", path: "/bookings?tab=my_bookings" },
    {
      icon: Zap,
      label: "Express Bookings",
      path: "/bookings?tab=express_bookings",
    },
    { icon: Edit, label: "Edit Profile", path: "/edit-profile" },
    { icon: Lock, label: "Change Password", path: "/change-password" },
    {
      icon: Compass,
      label: "Discover Artists",
      path: "https://starclinch.com/browse",
    },
    { icon: LogOut, label: "Logout", path: "/logout" },
  ];

  const handleNavigation = (path) => {
    if (path === "/logout") {
      console.log("Logging out");
      logout();
    } else if (path.startsWith("https")) {
      window.open(path, "_blank", "noopener,noreferrer");
    } else {
      navigate(path);
      if (isMobile) {
        onClose();
      }
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
          transform transition-all duration-300 ease-in-out z-50
          ${isOpen ? "w-72 translate-x-0" : "w-0 -translate-x-full"}
          border-r border-slate-700/50 flex flex-col overflow-hidden
        `}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700/50 rounded-lg z-10 cursor-pointer"
        >
          <X size={24} />
        </button>

        {/* Logo Section */}
        <div className="p-6 border-b border-slate-700/50 h-[73px] flex items-center pl-12">
          <div className="flex items-center gap-3">
            <img
              src="/images/StarClinchLogo.webp"
              alt="logo"
              className="w-40 h-18 object-contain"
            />
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all duration-200 group cursor-pointer"
            >
              <item.icon
                size={20}
                className="group-hover:scale-110 transition-transform flex-shrink-0"
              />
              <span className="font-medium whitespace-nowrap">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Post Requirement Button */}
        <div className="p-4 border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-sm mt-auto">
          <Link to="https://starclinch.com/book/category" target="_blank">
            <button className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-pink-500/50 hover:scale-105 whitespace-nowrap cursor-pointer">
              Post Your Requirement
            </button>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
