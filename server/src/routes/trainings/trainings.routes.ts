import express from "express";

import { 
  getTrainingsByUser,  
  getTraining, 
  getAllTrainings , 
  createTraining, 
  deleteTraining, 
  updateTraining  
} from "./trainings.controller";

const router = express.Router();

router.get("/", getAllTrainings);
router.post("/", createTraining);
router.get("/:id", getTraining);
router.put("/:id", updateTraining);
router.delete("/:id", deleteTraining);
router.get("/user/:id", getTrainingsByUser);

export default router;
