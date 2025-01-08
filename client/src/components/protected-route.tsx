import { useAuth } from "@/context/auth";
import { Navigate } from "react-router-dom";

const DynamicLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative flex space-x-4">
        <div className="w-4 h-4 bg-indigo-500 rounded-full animate-dynamic"></div>
        <div className="w-4 h-4 bg-indigo-500 rounded-full animate-dynamic delay-200"></div>
        <div className="w-4 h-4 bg-indigo-500 rounded-full animate-dynamic delay-400"></div>
        <div className="w-4 h-4 bg-indigo-500 rounded-full animate-dynamic delay-600"></div>
      </div>
    </div>
  );
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <DynamicLoader />;
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
