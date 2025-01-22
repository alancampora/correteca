import express from "express";

import { getTrainingsByUser,  getTraining, getAllTrainings , createTraining  } from "./trainings.controller";

const router = express.Router();

router.get("/", getAllTrainings);
router.post("/", createTraining);
router.get("/:id", getTraining);
router.get("/user/:id", getTrainingsByUser);

export default router;
