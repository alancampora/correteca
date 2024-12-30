import { NavigationMenu } from "@/components/NavigationMenu";
import useAuth from "@/lib/auth";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function Home({}: Props) {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    user && (
      <div>
        <NavigationMenu />
        <p>Welcome {user.username}</p>
      </div>
    )
  );
}
