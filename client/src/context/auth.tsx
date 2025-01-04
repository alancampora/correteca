import { fetchLogout, fetchMe } from "@/api/auth";
import React, { createContext, useContext, useState, useEffect } from "react";

type LogoutParams = {
  finallyCallback: Function
}
interface AuthContextType {
  user: any; // Replace `any` with your user type
  loading: boolean;
  logout: (params: LogoutParams) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      await fetchMe({
        successCallback: (data:any) => {
          setUser(data.user);
          setLoading(false);
        },
        errorCallback: () => {
          setUser(null);
          setLoading(false);
        },
      });
    };

    fetchUser();
  }, []);

  const logout = (params: LogoutParams) =>
    fetchLogout({ ...params });

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
