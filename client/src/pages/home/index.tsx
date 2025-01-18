import RocketIcon from "@/components/icons/rocket";
import UserLayout from "@/components/user-layout";
import VerticalNavbar from "@/components/vertical-navbar";
import { useAuth } from "@/context/auth";

type Props = {};

export default function Home({}: Props) {
  const { user } = useAuth();

  return <UserLayout title={`Welcome ${user.username}`}>test</UserLayout>;
}
