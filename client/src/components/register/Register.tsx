import { Field, Form, Formik } from "formik";
import { baseURL } from "../../constants/constants";
import {
  IRes,
  Position,
  Rol,
  User,
  SignupSchema,
} from "../../../types/interfaces";
import { useContext } from "react";
import { userContext } from "../../../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Loading } from "../Loading";
import { IoArrowBack } from "react-icons/io5";
import styles from "./register.module.css";

interface FormikRegister {
  userName: string;
  nombre: string;
  dni: string;
  cargo: Position;
  rol: Rol;
  password: string;
}

export const Register = () => {
  const { user, loading } = useContext(userContext)!;
  const navigate = useNavigate();
  const validateRegister = (values: FormikRegister) => {
    const send = {
      userName: values.userName,
      nombre: values.nombre,
      dni: values.dni,
      cargo: values.cargo,
      rol: values.rol,
      password: values.password,
    };
    fetch(`${baseURL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // tipo de contenido
      },
      credentials: "include",
      body: JSON.stringify(send),
    })
      .then((res) => res.json())
      .then((data: User | IRes) => {
        if (data.hasOwnProperty("res")) alert((data as IRes).res);
        if (data.hasOwnProperty("userName")) {
          alert("Usuario creado correctamente");
          navigate("/");
        }
      })
      .catch((error) => console.log(error));
  };
  if (loading) return <Loading />;
  if (user?.rol) return <Navigate to={`/dashboard/${user.rol}`} />;

  return (
    <>
      <div className="flex items-start min-h-screen bg-white mt-10">
        <div className="container mx-auto">
          <div className="max-w-md mx-auto">
            <div className="text-center">
              <div className="flex  items-center justify-start">
                <IoArrowBack
                  size={30}
                  className=" mr-36"
                  onClick={() => navigate(-1)}
                />

                <h1 className="my-3 text-3xl font-semibold text-gray-700">
                  Register
                </h1>
              </div>
              <p className="text-gray-500">New user registration</p>
            </div>
            <div className="m-2">
              <Formik
                initialValues={{
                  userName: "",
                  password: "",
                  cargo: Position.other,
                  dni: "",
                  nombre: "",
                  rol: Rol.Employee,
                }}
                onSubmit={validateRegister}
                validationSchema={SignupSchema}
              >
                <Form>
                  <div className="mb-6 mt-4">
                    <label className="mb-2 text-sm text-gray-600 flex">
                      Username
                    </label>
                    <Field
                      type="text"
                      name="userName"
                      id="userName"
                      placeholder="annie10"
                      className={styles.Field}
                    />
                  </div>
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-gray-600">Password</label>
                    </div>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Your Password"
                      className={styles.Field}
                    />
                  </div>
                  <div className="mb-6 mt-4">
                    <label className="mb-2 text-sm text-gray-600 flex">
                      Name
                    </label>
                    <Field
                      type="text"
                      name="nombre"
                      id="nombre"
                      placeholder="Annie"
                      className={styles.Field}
                    />
                  </div>
                  <div className="mb-6 mt-4">
                    <label className="mb-2 text-sm text-gray-600 flex">
                      DNI
                    </label>
                    <Field
                      type="text"
                      name="dni"
                      id="dni"
                      placeholder="20569846"
                      className={styles.Field}
                    />
                  </div>
                  <div className="mb-6 mt-4">
                    <label
                      className="mb-2 text-sm text-gray-600 flex"
                      htmlFor="position"
                    >
                      Position
                    </label>
                    <Field
                      name="position"
                      as="select"
                      id="position"
                      className={styles.Field}
                      placeholder="Data scientist"
                    >
                      <option value={undefined}></option>
                      <option value="developer">Developer</option>
                      <option value="designer">Designer</option>
                      <option value="data scientist">Data scientist</option>
                      <option value="other">Other</option>
                    </Field>
                  </div>

                  <div className="mb-6">
                    <button
                      type="submit"
                      className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                    >
                      Register
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
