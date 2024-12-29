import Landing from "@/components/Landing";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function Home({}: Props) {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login"); // Replace '/target-path' with your desired route
  };
  return <Landing onLogin={handleLogin} />;
}
