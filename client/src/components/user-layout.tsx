import { useAuth } from "@/context/auth";
import VerticalNavbar from "./vertical-navbar";
import RocketIcon from "./icons/rocket";

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function UserLayout({ title, subtitle, children }: Props) {
  const { user, loading } = useAuth();

  return (
    <div className="flex flex-row h-dvh">
      <VerticalNavbar isLoading={loading} />

      {user && (
        <main className="w-full">
          <header className="">
            <div className="flex flex-row items-center space-x-2 p-4">
              <RocketIcon />
              <p className="text-2xl font-bold">{title}</p>
            </div>
            {subtitle && <p className="text-lg px-2">{subtitle}</p>}
          </header>

          <section className="p-4">{children}</section>
        </main>
      )}
    </div>
  );
}
