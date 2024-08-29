import express from "express";
import { User } from "../database";
import { IUser, Rol } from "../types/Iuser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    const { password, ...data } = user.toObject();
    const token = jwt.sign(data, process.env.SECRET_JWT_KEY!, {
      expiresIn: "1h",
    });
    res.cookie("access_token", token, { maxAge: 1000 * 60 * 60 }).send(data);
    return;
  } else {
    res.status(401).send("Password invalido");
  }
});

router.post("/logout", (_req, res) => {
  res.clearCookie("access_token").send("Sesion cerrada");
});

router.post("/register", async (req, res) => {
  const { userName, nombre, dni, cargo, password }: IUser = req.body;
  const rol = Rol.Employee; // default
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
      const { password: _, ...data } = user.toObject();
      res.send(data);
      return;
    }
    res.status(400).send("El nombre de usuario ya está en uso");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/protected", (_req, res) => {
  const { user } = res.locals;
  if (!user) {
    res.status(403).send("No autorizado");
    return;
  }
  res.send(user);
});

router.get("/employees", async (_req, res) => {
  const { user } = res.locals;
  if (!user || !(user.rol == Rol.Admin || user.rol == Rol.Manager)) {
    res.status(403).send("No autorizado");
    return;
  }
  const allUsers = await User.find({}).exec();
  res.send(allUsers);
});

export default router;
