import {
  SquareChevronRight,
} from "lucide-react"; // Icons
import HomeIcon from "./icons/home";
import { Link, useNavigate } from "react-router";
import { Skeleton } from "./ui/skeleton";
import ProfileIcon from "./icons/profile";
import ShutDownIcon from "./icons/shut-down";
import MenRunning from "./icons/men-running";
import { useAuth } from "@/context/auth";

const navItems = [
  {
    icon: HomeIcon,
    label: "Home",
    link: "/home",
  },
  {
    icon: ProfileIcon,
    label: "Profile",
    link: "/profile",
    onClick: null,
  },
  {
    icon: MenRunning,
    label: "Trainings",
    link: "/trainings",
    onClick: null,
  },
  {
    icon: ShutDownIcon,
    label: "Logout",
    link: "",
    onClick: async (auth: any, navigate: any) => {
      await auth.logout({
        finallyCallback: () => {
          navigate("/");
        },
      });
    },
  },
];

type VerticalNavbarProps = { isLoading: boolean };

const VerticalNavbar = ({ isLoading }: VerticalNavbarProps) => {
  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <div className="w-20 sm:w-48 p-2 bg-stone-100 border-r">
      <div className="w-full justify-center flex flex-row space-x-2 items-center mb-6">
        <SquareChevronRight className="w-8 h-8" />
        <h1 className="hidden sm:inline text-lg">Correteca</h1>
      </div>

      {navItems.map((item) => {
        return isLoading ? (
          <Skeleton className="w-full h-[20px] mb-4" />
        ) : (
          <Link to={item?.link}>
            <button
              className="bg-stone-100 w-full justify-center p-2 flex flex-row items-center space-x-2 transition-colors duration-200 bg-stone-100 hover:bg-gray-50 hover:text-black mb-4"
              onClick={() => item.onClick && item?.onClick(auth, navigate)}
            >
              <item.icon className="w-8 h-8" />
              <span className="hidden sm:inline text-lg">{item.label}</span>
            </button>
          </Link>
        );
      })}
    </div>
  );
};

export default VerticalNavbar;
