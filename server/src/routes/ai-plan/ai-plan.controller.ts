import { Request, Response } from "express";
import mongoose from "mongoose";
import AIPlan from "./ai-plan.model";
import OpenAI from "openai";
import { warn } from "console";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateAIPlan = async (req: Request, res: Response) => {
  const { userId, messages, frequency, intensity, goal, timeframe } = req.body;

  try {
    const prompt = `
        You are an expert running coach. Based on the following user details, create a detailed and structured running training plan:

        **User Details:**
        Goal: ${goal}
        Frequency: ${frequency} days per week
        Intensity: ${intensity}
        Timeframe: ${timeframe} (e.g., "1 month", "3 months", or "no time restrictions")

        **Instructions:**

          1. Adjust the training plan to  strictly match the specified timeframe (\${timeframe}). Ensure the plan spans the exact duration if a timeframe is provided, progressively building endurance, speed, and strength each week to achieve the user's goal (\${goal}).
          2. If no timeframe is specified, design a flexible, open-ended plan that gradually increases intensity and volume over multiple weeks or months, avoiding overtraining.
          3. Adapt the number of weekly training days to match the user's specified frequency (\${frequency} days per week). Distribute workouts appropriately to balance training and recovery.
          4. Include a variety of workouts (e.g., easy runs, intervals, tempo runs, long runs) tailored to the user's intensity level (\${intensity}), while incorporating rest days for recovery.
          5. Provide detailed notes for each session, including:
             - **Pace guidelines** (e.g., conversational pace, race pace).
             - **Recovery advice** (e.g., rest between intervals, active recovery tips).
             - **Hydration/nutrition tips** as appropriate.

        **Output:** 
        Generate the training plan in JSON format only, without extra text or code block delimiters. Ensure the plan:
        - Fully aligns with the user's specified timeframe (\${timeframe}) if provided.
        - Dynamically adjusts the number of workouts to match the user's specified frequency (\${frequency}).

        **Example JSON Output:**
        {
          "recommendation": "Based on your input, this is your personalized training plan designed to achieve your goal.",
          "weeks": [
            {
              "week": 1,
              "workouts": [
                { "day": "Monday", "workout": "5km Easy Run", "notes": "Maintain a conversational pace (~70% effort)." },
                { "day": "Wednesday", "workout": "Intervals: 6x400m at race pace", "notes": "Run each interval at 4:50/km pace. Take a 90-second jog between intervals." },
                { "day": "Friday", "workout": "Tempo Run: 6km at threshold pace", "notes": "Run at 80% effort (~5:00/km pace)." },
                { "day": "Sunday", "workout": "Long Run: 10km at an easy pace", "notes": "Focus on endurance and hydration. Keep your pace relaxed (~6:00/km)." }
              ]
            }
            // Add subsequent weeks based on the timeframe or create an open-ended progressive plan
          ]
        }
        `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: prompt }],
    });

    console.log(JSON.parse(response.choices[0].message.content));

    const plan = JSON.parse(response.choices[0].message.content);

    res.status(201).json(plan);
  } catch (error) {
    console.error("Error generating AI plan:", error);
    res.status(500).json({ message: "Failed to generate AI plan" });
  }
};

export const saveAIPlan = async (req, res) => {
  try {
    const { userId, goal, frequency, level, timeRestriction, plan } = req.body;

    // Validate required fields
    if (!userId || !goal || !frequency || !level || !plan || !timeRestriction) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new AI plan instance
    const newPlan = new AIPlan({
      userId: new mongoose.Types.ObjectId(userId), // Ensure `userId` is in ObjectId format
      goal,
      frequency,
      timeRestriction,
      level,
      plan,
    });

    // Save the plan to the database
    const savedPlan = await newPlan.save();

    res.status(201).json({
      message: "AI plan saved successfully.",
      plan: savedPlan,
    });
  } catch (error) {
    console.error("Error saving AI plan:", error);
    res.status(500).json({ message: "Failed to save AI plan." });
  }
};


export const getAllGeneratedPlans = async (req: Request, res: Response) => {
  try {
    console.log({ userId: req.query.userId });
    const plans = await AIPlan.find({ userId: req.query.userId }); // Replace with proper user authentication
    console.log({ plans });
    res.status(200).json(plans);
  } catch (error) {
    console.error("Error fetching plans:", error);
    res.status(500).json({ message: "Failed to fetch plans." });
  }
};

export const getPlanForUser = async (req, res) => {
  const { planId } = req.params;
  const { userId } = req.query; // userId should be passed as a query parameter

  try {
    const plan = await AIPlan.findOne({ _id: planId, userId });

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.status(200).json(plan);
  } catch (error) {
    console.error("Error fetching the plan:", error);
    res.status(500).json({ message: "Failed to fetch the plan" });
  }
}
