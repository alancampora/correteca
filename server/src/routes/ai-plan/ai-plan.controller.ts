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

        Goal: ${goal}
        Frequency: ${frequency} days per week
        Intensity: ${intensity}
        Timeframe: ${timeframe} (e.g., "1 month" or "no time restrictions")

        Ensure the plan:
        1. If a timeframe is specified (${timeframe}), adjust the plan to fit within the given duration, progressively building endurance, speed, and strength each week to achieve the stated goal (${goal}).
        2. If no timeframe is specified, create a flexible and progressive plan that spans multiple weeks or months, gradually increasing intensity and volume without overtraining.
        3. Maximize the training days (${frequency} days per week) by including a mix of easy runs, intervals, tempo runs, long runs, and rest days for recovery.
        4. Provide clear and specific notes for each session, such as pace guidelines (e.g., conversational pace, race pace), recovery advice, and hydration tips.

        Output the training plan in JSON format only, without any code block delimiters or extra text:
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
}
