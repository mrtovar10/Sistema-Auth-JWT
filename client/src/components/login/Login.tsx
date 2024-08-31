import { Field, Form, Formik, FormikValues } from "formik";
import { baseURL } from "../../constants/constants";
import { IRes, User } from "../../../types/interfaces";
import { useContext } from "react";
import { userContext } from "../../../context/UserContext";
import { Navigate, Link } from "react-router-dom";
import { Loading } from "../Loading";

export const Login = (): JSX.Element => {
  const { user, login, loading } = useContext(userContext)!;
  const validateUser = (values: FormikValues) => {
    const send = {
      userName: values.userName,
      password: values.password,
    };
    fetch(`${baseURL}/api/auth/login`, {
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
        if (data.hasOwnProperty("userName")) login(data as User);
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
              <h1 className="my-3 text-3xl font-semibold text-gray-700">
                Sign in
              </h1>
              <p className="text-gray-500">Sign in to access your dashboard</p>
            </div>
            <div className="m-2">
              <Formik
                initialValues={{ userName: "", password: "" }}
                onSubmit={validateUser}
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
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    />
                  </div>
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-gray-600">Password</label>
                      <Link
                        to={"/register"}
                        className="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500"
                      >
                        Register
                      </Link>
                    </div>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Your Password"
                      className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                    />
                  </div>
                  <div className="mb-6">
                    <button
                      type="submit"
                      className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                    >
                      Sign in
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
