import { useAuth } from "@/context/auth";
import VerticalNavbar from "./vertical-navbar";
import RocketIcon from "./icons/rocket";

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

//<div className="flex flex-row h-dvh">
export default function UserLayout({ title, subtitle, children }: Props) {
  const { user, loading } = useAuth();

  return (
    <div className="flex flex-row max-h-dvh h-dvh">
      <VerticalNavbar isLoading={loading} />
      {user && (
        <main className="flex flex-col w-full">
          <header className="">
            <div className="flex flex-row items-center space-x-2 p-4 bg-indigo-700 text-white">
              <RocketIcon />
              <p className="text-2xl font-semibold">{title}</p>
            </div>
            {subtitle && <p className="text-lg px-2">{subtitle}</p>}
          </header>

          <section className="flex-grow p-4 overflow-y-auto ">{children}</section>
        </main>
      )}
    </div>
  );
}
