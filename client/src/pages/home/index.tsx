import RocketIcon from "@/components/icons/rocket";
import VerticalNavbar from "@/components/vertical-navbar";
import { useAuth } from "@/context/auth";

type Props = {};

export default function Home({ }: Props) {
  const { user, loading } = useAuth();

  return (
    <div className="flex flex-row h-dvh">
      <VerticalNavbar isLoading={loading} />

      {user && (
        <main className="w-full">
          <header className="">
            <div className="flex flex-row items-center space-x-2 p-2">
              <RocketIcon />
              <p className="text-2xl font-bold">Welcome {user.username}</p>
            </div>
            <p className="text-lg px-2">
              Start Adding your Businnes Object from here
            </p>
          </header>

          <section className="w-full"></section>
        </main>
      )}
    </div>
  );
}
