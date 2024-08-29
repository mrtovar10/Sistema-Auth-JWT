import { Schema } from "mongoose";
import { IUser } from "../types/Iuser";

export const userSchema = new Schema<IUser>({
  nombre: { type: String, required: true },
  dni: { type: Number, required: true },
  cargo: { type: String, required: true },
  rol: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true, select: false },
});
