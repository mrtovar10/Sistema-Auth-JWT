import { useContext } from "react";
import { Header } from "../header/Header";
import { userContext } from "../../../context/UserContext";
import { Navigate } from "react-router-dom";
import { Loading } from "../Loading";

export const ManagerDashboard = (): JSX.Element => {
  const { user, loading } = useContext(userContext)!;
  if (loading) return <Loading />;
  if (!user?.rol) return <Navigate to={`/`} />;
  return (
    <>
      <Header />
      <h1>Manager Dashboard</h1>
      <div className="flex">
        <h2>Nombre de usuario:</h2>
        <p>{user.userName}</p>
      </div>
      <div className="flex">
        <h2>Nombre:</h2>
        <p>{user.nombre}</p>
      </div>
      <div className="flex">
        <h2>DNI:</h2>
        <p>{user.dni}</p>
      </div>
      <div className="flex">
        <h2>Rol:</h2>
        <p>{user.rol}</p>
      </div>
    </>
  );
};
