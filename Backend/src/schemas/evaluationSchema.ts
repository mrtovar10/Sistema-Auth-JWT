import { Schema } from "mongoose";
import { Ievaluation, IgeneralScore, Imetrics } from "../types/Ievaluation";

const scoreSchema = new Schema<IgeneralScore>({
  score: { type: Number, required: true },
});

const metricsSchema = new Schema<Imetrics>({
  productivity: { type: scoreSchema, required: false },
  jobQuality: { type: scoreSchema, required: false },
  teamWork: { type: scoreSchema, required: false },
  punctuality: { type: scoreSchema, required: false },
  communication: { type: scoreSchema, required: false },
  initiative: { type: scoreSchema, required: false },
});

export const evaluationSchema = new Schema<Ievaluation>({
  title: { type: String, required: true },
  userName: { type: String, required: true },
  date: { type: String, required: true },
  metrics: { type: metricsSchema, required: true },
  generalScore: { type: scoreSchema, required: false },
  feedback: { type: String, required: false },
});
