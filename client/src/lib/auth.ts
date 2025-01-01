import { useState, useEffect } from "react";
import { IUser } from "@common/User";
import { fetchMe } from "@/api/auth";

const useAuth = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      await fetchMe({
        successCallback: (data: { user: IUser }) => {
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

  return { user, loading };
};

export default useAuth;
