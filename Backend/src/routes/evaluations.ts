import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("Fetching all evaluations");
});

router.post("/", (_req, res) => {
  res.send("Fetching all evaluations");
});

export default router;
