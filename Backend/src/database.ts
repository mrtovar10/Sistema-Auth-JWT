import { Schema, model, connect } from "mongoose";
import { IUser } from "./types/user";
const dotenv = require("dotenv");
dotenv.config();

const userSchema = new Schema<IUser>({
  nombre: { type: String, required: true },
  dni: { type: Number, required: true },
  cargo: { type: String, required: true },
  rol: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true, select: false },
});

export const User = model<IUser>("user", userSchema);

run().catch((err) => console.log(err));

async function run() {
  console.log(process.env.DB_USER);
  await connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cabp9.mongodb.net/${process.env.DB_NAME}`
  );
  console.log("conected to db");
}
