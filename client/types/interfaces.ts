import * as Yup from "yup";
export interface UserContextType {
  user: User | null;
  login: (arg: User) => void;
  logout: () => void;
  loading: boolean;
}

export interface User {
  nombre: string;
  dni: number;
  cargo: string;
  rol: Rol;
  userName: string;
  _id: string;
}

export enum Rol {
  Admin = "Admin",
  Employee = "Employee",
  Manager = "Manager",
}

export interface IRes {
  res: string;
}

export enum Position {
  developer = "developer",
  designer = "designer",
  dataScientist = "data scientist",
  other = "other",
}

export const SignupSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, "Too Short!")
    .max(12, "Too Long!")
    .required("Required"),
  nombre: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  dni: Yup.string()
    .min(2, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
  cargo: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  rol: Yup.string()
    .min(2, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(15, "Too Long!")
    .required("Required"),
});
