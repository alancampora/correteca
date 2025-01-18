import express from "express";
//import { generateAIPlan, getUserAIPlans } from "./ai-plan.mock.controller";
import { generateAIPlan, getUserAIPlans } from "./ai-plan.controller";

const router = express.Router();

// Route to generate an AI plan
router.post("/generate", generateAIPlan);

// Route to fetch user's AI plans
router.get("/user/:userId", getUserAIPlans);

export default router;
