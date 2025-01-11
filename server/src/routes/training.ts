import express from "express";
import Training from "../models/training";

const router = express.Router();

// Create a new training
router.post("/", async (req, res) => {
  try {
    const training = new Training({
      ...req.body,
      userId: req.body.userId,
      title: req.body.title,
      totalDistance: req.body.laps.reduce(
        (acc: number, lap: { distance: number }) => acc + lap.distance,
        0,
      ),
    });
    await training.save();
    res.status(201).send(training);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all trainings
router.get("/", async (req: any, res: any) => {
  try {
    const trainings = await Training.find({});
    res.status(200).send(trainings);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific training by ID
router.get("/:id", async (req: any, res: any) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) {
      return res.status(404).send();
    }
    res.status(200).send(training);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a training by ID
router.put("/:id", async (req: any, res: any) => {
  try {
    const training = await Training.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!training) {
      return res.status(404).send();
    }
    res.status(200).send(training);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a training by ID
router.delete("/:id", async (req: any, res: any) => {
  try {
    const training = await Training.findByIdAndDelete(req.params.id);
    if (!training) {
      return res.status(404).send();
    }
    res.status(200).send(training);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get training statistics
router.get("/stats", async (req: any, res: any) => {
  try {
    const { startDate, endDate } = req.query;
    const query: any = { userId: req.user._id };

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string),
      };
    }

    const stats = await Training.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalDistance: { $sum: "$totalDistance" },
          trainingCount: { $sum: 1 },
          totalLaps: { $sum: { $size: "$laps" } },
        },
      },
    ]);

    res.status(200).send(
      stats[0] || {
        totalDistance: 0,
        trainingCount: 0,
        totalLaps: 0,
      },
    );
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
