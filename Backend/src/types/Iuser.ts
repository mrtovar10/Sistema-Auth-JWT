export interface IUser {
  nombre: string;
  dni: number;
  cargo: string;
  rol: Rol;
  userName: string;
  password: string;
}

export interface IUserPublic extends Omit<IUser, "password"> {}

export enum Rol {
  Admin = "Admin",
  Employee = "Employee",
  Manager = "Manager",
}
