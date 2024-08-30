import express from "express";
import evaluationsRouter from "./routes/evaluations";
import authRouter from "./routes/auth";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { IUserPublic } from "./types/Iuser";
const cors = require("cors");
require("./database");

const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  const token = req.cookies.access_token;
  const user: null | IUserPublic = null;
  res.locals = { user };
  try {
    const data = jwt.verify(token, process.env.SECRET_JWT_KEY!) as IUserPublic;
    res.locals.user = data;
  } catch {}
  next();
});
app.use(
  cors({
    origin: process.env.ORIGIN_PORT || "http://localhost:5173", // Permite solicitudes solo desde este origen
  })
);

const PORT = process.env.PORT ?? 8080;

app.get("/cookie", (_req, res) => {
  res.send({ data: res.locals.user });
});

app.use("/api/evaluations", evaluationsRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
