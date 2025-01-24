import express from "express";
import { getAllGeneratedPlans, saveAIPlan } from "./ai-plan.controller";
import { generateAIPlan } from "./ai-plan.controller";

const router = express.Router();

router.get("/", getAllGeneratedPlans);
router.post("/generate", generateAIPlan);
router.post("/save", saveAIPlan);

export default router;
