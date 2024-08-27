import express from "express";
import { User } from "../database";
import { IUser } from "../types/user";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { userName, password }: IUser = req.body;
  const uName = userName?.toLowerCase();
  const user = await User.findOne({ userName: uName })
    .select("+password")
    .exec();
  if (!user) {
    res.status(400).send("Usuario no existe");
    return;
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (isValid) {
    res.send({ userName: user.userName, rol: user.rol });
    return;
  } else {
    res.status(401).send("Password invalido");
  }
});

router.post("/logout", (_req, res) => {
  res.send({});
});

router.post("/register", async (req, res) => {
  const { userName, nombre, dni, cargo, rol, password }: IUser = req.body;
  const uName = userName?.toLowerCase();
  const salt = Number(process.env.SALT_ROUNDS);
  try {
    const exist = await User.findOne({ userName: uName }).exec();
    if (!exist) {
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new User({
        userName: uName,
        nombre,
        dni,
        cargo,
        rol,
        password: hashedPassword,
      });
      await user.save();
      res.send({ userName: user.userName, rol: user.rol });
      return;
    }
    res.status(400).send("El nombre de usuario ya está en uso");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/protected", (_req, res) => {
  res.send({});
});

export default router;
