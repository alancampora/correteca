import express from "express";
import { getAllGeneratedPlans, getPlanForUser, saveAIPlan } from "./ai-plan.controller";
import { generateAIPlan } from "./ai-plan.controller";

const router = express.Router();

router.get("/", getAllGeneratedPlans);
router.get("/:planId", getPlanForUser);
router.post("/generate", generateAIPlan);
router.post("/save", saveAIPlan);

export default router;
