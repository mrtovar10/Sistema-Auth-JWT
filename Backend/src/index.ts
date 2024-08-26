import express from "express";
import evaluationsRouter from "./routes/evaluations";
import authRouter from "./routes/auth";
require("./database");

const app = express();
app.use(express.json());

const PORT = process.env.PORT ?? 3000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here!");
  res.send("pong");
});

app.use("/api/evaluations", evaluationsRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
