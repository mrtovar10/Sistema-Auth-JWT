import express from "express";

const router = express.Router();

router.post("/login", (_req, res) => {
  res.send({});
});
router.post("/logout", (_req, res) => {
  res.send({});
});
router.post("/register", (_req, res) => {
  res.send({});
});
router.post("/protected", (_req, res) => {
  res.send({});
});

export default router;
