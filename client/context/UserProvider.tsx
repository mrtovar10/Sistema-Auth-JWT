import { useEffect, useState } from "react";
import { userContext } from "./UserContext";
import { User } from "../types/interfaces";
import { baseURL } from "../src/constants/constants";

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseURL}/cookie`)
      .then((res) => res.json())
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => console.log(error));
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };
  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
      <h1>{JSON.stringify(user, null, 2)}</h1>
      {children}
    </userContext.Provider>
  );
};
