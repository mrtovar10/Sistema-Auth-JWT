import express from "express";
import { User } from "../database";
import { IUser } from "../types/user";

const router = express.Router();

router.post("/login", (_req, res) => {
  res.send({});
});
router.post("/logout", (_req, res) => {
  res.send({});
});

router.post("/register", async (req, res) => {
  const { userName, nombre, dni, cargo, rol, password }: IUser = req.body;
  const uName = userName?.toLowerCase();
  try {
    const user = new User({
      userName: uName,
      nombre,
      dni,
      cargo,
      rol,
      password,
    });
    const exist = await User.findOne({ userName: uName }).exec();
    if (!exist) {
      await user.save();
      res.send(user);
      return;
    }
    res.status(400).send("Nombre de Usuario ya está en uso");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/protected", (_req, res) => {
  res.send({});
});

export default router;
