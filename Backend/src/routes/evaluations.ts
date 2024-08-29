import express from "express";
import { Ievaluation } from "../types/Ievaluation";
import { Rol } from "../types/Iuser";
import { Evaluation } from "../database";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("Fetching all evaluations");
});

router.post("/", (_req, res) => {
  res.send("Fetching all evaluations");
});

router.post("/create", async (req, res) => {
  const { user } = res.locals;
  if (!user || !(user.rol == Rol.Admin || user.rol == Rol.Manager)) {
    res.status(403).send("No autorizado");
    return;
  }

  const { userName, feedback, generalScore, metrics, title }: Ievaluation =
    req.body;
  const date = new Date().toString();
  const uName = userName?.toLowerCase();

  try {
    const evaluation = new Evaluation({
      userName: uName,
      date,
      title,
      metrics,
      generalScore,
      feedback,
    });
    await evaluation.save();
    res.send(evaluation);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:id", async (req, res) => {
  const { user } = res.locals;
  if (!user || !(user.rol == Rol.Admin || user.rol == Rol.Manager)) {
    res.status(403).send("No autorizado");
    return;
  }
  const { id } = req.params;
  try {
    const evaluation = await Evaluation.findById(id).lean().exec();
    if (!evaluation) {
      res.status(400).send(`Id ${id} no existe`);
      return;
    }
    res.send(evaluation);
  } catch (error) {
    res.status(400).send(`Id ${id} no existe`);
  }
});

router.put("/:id", async (req, res) => {
  const { user } = res.locals;
  const { feedback, generalScore, metrics, title }: Ievaluation = req.body;
  if (!user || !(user.rol == Rol.Admin || user.rol == Rol.Manager)) {
    res.status(403).send("No autorizado");
    return;
  }
  const { id } = req.params;

  try {
    const evaluation = await Evaluation.findById(id).exec();
    if (!evaluation) {
      res.status(400).send(`Id ${id} no existe`);
      return;
    }

    evaluation.title = title ?? evaluation?.title;
    evaluation.feedback = feedback ?? evaluation?.feedback;
    evaluation.generalScore.score =
      generalScore.score ?? evaluation.generalScore.score;
    evaluation.metrics.communication.score =
      metrics.communication.score ?? evaluation.metrics.communication.score;
    evaluation.metrics.initiative.score =
      metrics.initiative.score ?? evaluation.metrics.initiative;
    evaluation.metrics.jobQuality.score =
      metrics.jobQuality.score ?? evaluation.metrics.jobQuality.score;
    evaluation.metrics.productivity.score =
      metrics.productivity.score ?? evaluation.metrics.productivity.score;
    evaluation.metrics.punctuality.score =
      metrics.punctuality.score ?? evaluation.metrics.punctuality.score;
    evaluation.metrics.teamWork.score =
      metrics.teamWork.score ?? evaluation?.metrics.teamWork.score;
    await evaluation.save();

    res.send(evaluation);
  } catch (error) {
    res.status(400).send(`Id ${id} no existe`);
  }
});

export default router;
