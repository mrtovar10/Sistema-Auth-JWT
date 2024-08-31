import { useEffect, useState } from "react";
import { userContext } from "./UserContext";
import { User } from "../types/interfaces";
import { baseURL } from "../src/constants/constants";

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseURL}/cookie`, { credentials: "include" })
      .then((res) => res.json())
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    fetch(`${baseURL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    }).catch((error) => console.log(error));
    setUser(null);
  };
  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </userContext.Provider>
  );
};
