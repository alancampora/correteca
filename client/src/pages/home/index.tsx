import { NavigationMenu } from "@/components/NavigationMenu";
import VerticalNavbar from "@/components/VerticalNavbar";
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
      <div className="flex flex-row space-x-4">
        <VerticalNavbar />
        <main className="w-full p-4">
          <p className="text-2xl font-bold">🚀 Welcome {user.username}</p>
          <p className="text-lg">Start Adding your Businnes Object from here</p>
        </main>
      </div>
    )
  );
}
