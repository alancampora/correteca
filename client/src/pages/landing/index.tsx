import Landing from "@/components/Landing";
import useAuth from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import Home from "../home";

type Props = {};

export default function LandingMain({}: Props) {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const handleLogin = () => {
    navigate("/login"); // Replace '/target-path' with your desired route
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return user ? <Home /> : <Landing onLogin={handleLogin} />;
}
