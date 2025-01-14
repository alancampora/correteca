import { Request, Response } from "express";
import AIPlan from "./ai-plan.model";
import OpenAI from "openai";

// Configure OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate a new AI plan
export const generateAIPlanReal = async (req: Request, res: Response) => {
  const { userId, goal, frequency, intensity, trainings } = req.body;

  try {
    const prompt = `
    Generate a running training plan for the following user:
    Goal: ${goal}
    Frequency: ${frequency} days per week
    Intensity: ${intensity}
    Previous trainings: ${JSON.stringify(trainings)}

    Format the output as a JSON array where each object represents a day of the week:
    [
      { "day": "Monday", "workout": "5km Easy Run" },
      { "day": "Wednesday", "workout": "Intervals: 6x400m at race pace" },
      { "day": "Friday", "workout": "10km Long Run" }
    ]
    `;

    const response = await openai.chat.completions.create({
      model: "text-davinci-003",
      messages: [{ role: "system", content: prompt }],
    });

    const plan = JSON.parse(response.choices[0].message.content);


    // Save the plan to MongoDB
    const aiPlan = new AIPlan({
      userId,
      goal,
      frequency,
      intensity,
      plan,
    });

    await aiPlan.save();

    res.status(201).json(aiPlan);
  } catch (error) {
    console.error("Error generating AI plan:", error);
    res.status(500).json({ message: "Failed to generate AI plan" });
  }
};

// Get all AI plans for a user
export const getUserAIPlans = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const plans = await AIPlan.find({ userId });
    res.status(200).json(plans);
  } catch (error) {
    console.error("Error fetching AI plans:", error);
    res.status(500).json({ message: "Failed to fetch AI plans" });
  }
};