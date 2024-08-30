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
}

export enum Rol {
  Admin = "Admin",
  Employee = "Employee",
  Manager = "Manager",
}

export interface IRes {
  res: string;
}
