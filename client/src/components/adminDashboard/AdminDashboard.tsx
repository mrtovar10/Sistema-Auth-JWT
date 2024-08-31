import { useContext } from "react";
import { Header } from "../header/Header";
import { userContext } from "../../../context/UserContext";
import { Navigate } from "react-router-dom";
import { Loading } from "../Loading";

export const AdminDashboard = () => {
  const { user, loading } = useContext(userContext)!;
  if (loading) return <Loading />;
  if (!user?.rol) return <Navigate to={`/`} />;
  return (
    <>
      <Header />
    </>
  );
};
