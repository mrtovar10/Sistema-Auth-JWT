import { model, connect } from "mongoose";
import { IUser } from "./types/Iuser";
import { userSchema } from "./schemas/userSchema";
import { Ievaluation } from "./types/Ievaluation";
import { evaluationSchema } from "./schemas/evaluationSchema";
const dotenv = require("dotenv");
dotenv.config();

export const User = model<IUser>("user", userSchema);
export const Evaluation = model<Ievaluation>("evaluation", evaluationSchema);

run().catch((err) => console.log(err));

async function run() {
  console.log(process.env.DB_USER);
  await connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cabp9.mongodb.net/${process.env.DB_NAME}`
  );
  console.log("conected to db");
}
