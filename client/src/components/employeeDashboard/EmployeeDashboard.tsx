import { useContext } from "react";
import { Header } from "../header/Header";
import { userContext } from "../../../context/UserContext";
import { Navigate } from "react-router-dom";
import { Loading } from "../Loading";
import { GeneralResults } from "../results/GeneralResults";

export const EmployeeDashboard = (): JSX.Element => {
  const { user, loading } = useContext(userContext)!;
  if (loading) return <Loading />;
  if (!user?.rol) return <Navigate to={`/`} />;
  return (
    <>
      <Header />
      <div className="h-full bg-gray-200 p-8">
        <div className="bg-white rounded-lg shadow-xl pb-8">
          <div className="absolute right-12 mt-4 rounded"></div>
          <div className="w-full h-[100px]"></div>
          <div className="flex flex-col items-center -mt-20">
            <div className="flex items-center space-x-2 mt-2">
              <p className="text-2xl">{user.userName}</p>
            </div>
          </div>
        </div>

        <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
          <div className="w-full flex flex-col 2xl:w-1/3">
            <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
              <h4 className="text-xl text-gray-900 font-bold">
                Datos de su perfil
              </h4>
              <ul className="mt-2 text-gray-700">
                <li className="flex border-y py-2">
                  <span className="font-bold w-24">Nombre:</span>
                  <span className="text-gray-700 ml-6">{user.nombre}</span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Position:</span>
                  <span className="text-gray-700 ml-6">{user.cargo}</span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">DNI:</span>
                  <span className="text-gray-700 ml-6">{user.dni}</span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Name:</span>
                  <span className="text-gray-700 ml-6">{`${user.nombre}`}</span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Rol:</span>
                  <span className="text-gray-700 ml-6">{`${user.rol}`}</span>
                </li>
                <li className="flex border-b py-2">
                  <span className="font-bold w-24">Id:</span>
                  <span className="text-gray-700 ml-6 flex justify-center items-center">
                    {user._id}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col w-full 2xl:w-2/3">
            <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
              <h4 className="text-xl text-gray-900 font-bold">
                Panel de opciones
              </h4>
            </div>
            <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
              <div className="flex">
                <p className="text-xl text-gray-900 font-bold">Resultados</p>
              </div>
              <GeneralResults />
              <div className="mt-4"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
