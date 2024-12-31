import VerticalNavbar from "@/components/VerticalNavbar";
import useAuth from "@/lib/auth";

type Props = {};

export default function Home({}: Props) {
  const { user, loading } = useAuth();

  return (
    <div className="flex flex-row space-x-4">
      <VerticalNavbar isLoading={loading} />

      {user && (
        <main className="w-full p-4">
          <p className="text-2xl font-bold">🚀 Welcome {user.username}</p>
          <p className="text-lg">Start Adding your Businnes Object from here</p>
        </main>
      )}
    </div>
  );
}
