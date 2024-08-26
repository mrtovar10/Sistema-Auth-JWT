import { Schema, model, connect } from "mongoose";
const dotenv = require("dotenv");
dotenv.config();

interface IUser {
  nombre: string;
  dni: number;
  cargo: string;
  rol: string;
}

const userSchema = new Schema<IUser>({
  nombre: { type: String, required: true },
  dni: { type: Number, required: true },
  cargo: { type: String, required: true },
  rol: { type: String, required: true },
});

const User = model<IUser>("Esto", userSchema);

run().catch((err) => console.log(err));

async function run() {
  console.log(process.env.DB_USER);
  await connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cabp9.mongodb.net/nolatech`
  );

  const user = new User({
    nombre: "Maximo",
    dni: 20083743,
    cargo: "Developer",
    rol: "Admin",
  });
  await user.save();

  console.log(user.nombre);
}
