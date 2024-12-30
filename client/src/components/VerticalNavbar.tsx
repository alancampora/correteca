import {
  Home,
  SquareChevronRight,
  User,
  Settings,
  Bell,
  LogOut,
} from "lucide-react"; // Icons
import { Link, useNavigate } from "react-router";

const navItems = [
  {
    icon: Home,
    label: "Home",
    link: "/home",
  },
  {
    icon: User,
    label: "Profile",
    link: "/profile",
  },
  {
    icon: LogOut,
    label: "Profile",
    onClick: async (navigate) => {
      await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/");
    },
  },
];

const VerticalNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-30 sm:w-48 p-2 bg-white border-r">
      <div className="w-full justify-center flex flex-row space-x-2 items-center mb-6">
        <SquareChevronRight className="w-8 h-8" />
        <h1 className="text-lg">Codeteca</h1>
      </div>

      {navItems.map((item) => {
        return (
          //<Link to={item?.link}>
          <button
            className="w-full justify-center p-2 flex flex-row items-center space-x-2 transition-colors duration-200 bg-white hover:bg-gray-50 hover:text-black mb-4"
            onClick={() => item.onClick && item?.onClick(navigate)}
          >
            <item.icon className="w-6 h-6" />
            <span className="hidden sm:inline text-lg">{item.label}</span>
          </button>
          //</Link>
        );
      })}
    </div>
  );
};

export default VerticalNavbar;
