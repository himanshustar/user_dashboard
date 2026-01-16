import { Bell, Menu, User } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";

const Header = ({ onMenuClick, sidebarOpen }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50">
      <div className="flex items-center justify-between px-4 lg:px-6 py-0.5">
        {/* Left: Hamburger Menu - Hidden when sidebar is open */}
        <button
          onClick={onMenuClick}
          className={`text-slate-300 hover:text-white transition-all duration-300 p-2 cursor-pointer hover:bg-slate-700/50 rounded-lg ${
            sidebarOpen ? "opacity-0 invisible" : "opacity-100 visible"
          }`}
        >
          <Menu size={24} />
        </button>

        {/* Center: Logo - Always centered */}
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-2">
            {/* <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <h1 className="text-xl font-bold text-white">Clinch</h1> */}
            <img
              src="/images/StarClinchLogo.webp"
              alt="logo"
              className="w-40 h-17 object-contain"
            />
          </div>
        </div>

        {/* Right: Profile */}
        <div className="flex items-center gap-2">
          <button className="cursor-pointer relative p-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-3 pl-3 border-l border-slate-700/50">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-white">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="text-xs text-slate-400">{user?.email}</p>
            </div>
            <button
              onClick={() => navigate("/edit-profile")}
              className="cursor-pointer w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
            >
              <User size={20} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
