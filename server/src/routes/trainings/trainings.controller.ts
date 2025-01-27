import Training from "./trainings.model";

export const createTraining = async (req, res) => {
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
}

export const getAllTrainings = async (req: any, res: any) => {
  try {
    const trainings = await Training.find({});
    res.status(200).send(trainings);
  } catch (error) {
    res.status(500).send(error);
  }
}

export const getTraining = async (req: any, res: any) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) {
      return res.status(404).send();
    }
    res.status(200).send(training);
  } catch (error) {
    res.status(500).send(error);
  }
}

export const getTrainingsByUser = async (req: any, res: any) => {
  try {
    const userId = req.params.id;
    const trainings = await Training.find({ userId });
    if (!trainings) {
      return res.status(404).send();
    }
    res.status(200).send(trainings);
  } catch (error) {
    console.log("pincha mal");
    res.status(500).send(error);
  }

}

export const deleteTraining = async (req: any, res: any) => {
  try {
    const training = await Training.findByIdAndDelete(req.params.id);
    if (!training) {
      return res.status(404).send();
    }
    res.status(200).send(training);
  } catch (error) {
    res.status(500).send(error);
  }
}

// Update a training by ID
export const updateTraining = async (req: any, res: any) => {
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
};


