import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../../types/interfaces";
import { baseURL } from "../../constants/constants";
import { Loading } from "../Loading";

export const EmployeesList = () => {
  const [employees, setEmployees] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseURL}/api/auth/employees`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.hasOwnProperty("res")) alert(data.res);
        if (data.hasOwnProperty("arr")) setEmployees(data.arr);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  if (loading) return <Loading />;
  return (
    <>
      <p className="text-xl text-gray-900 font-bold">Lista de empleados</p>
      <ul className="mt-2 text-gray-700">
        {employees?.map((employee) => {
          return (
            <li className="flex border-y py-2">
              <span className="w-5 md:w-40">{employee.nombre}</span>
              <span className="ml-20 w-10 md:w-40">{employee.cargo}</span>
              <Link
                to={`/employee-details/${employee._id}`}
                className="ml-10 w-5 underline text-blue-700"
              >
                Detalles
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
