import { Request, Response } from "express";
import AIPlan from "./ai-plan.model";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateAIPlan = async (req: Request, res: Response) => {
  const { userId, messages } = req.body;

  const goal = "";
  const frequency = "4";
  const intensity = "Medium";
  const trainings = [];

  try {
    const prompt = `
        You are an expert running coach. Based on the following user details, create a detailed and structured running training plan:

        Goal: ${goal}
        Frequency: ${frequency} days per week
        Intensity: ${intensity}
        Previous Trainings: ${JSON.stringify(trainings)}

        Ensure the plan:
        1. Maximizes the training days (${frequency} days per week) by including easy runs, intervals, tempo runs, long runs, and rest days for optimal recovery.
        2. Progressively builds the user's endurance, speed, and strength to achieve the stated goal (${goal}).
        3. Includes specific notes for each session, such as pace guidelines (e.g., conversational pace, race pace) and recovery advice.

        Provide the response in JSON format only, without any code block delimiters or extra text:
        {
          "recommendation": "Based on your input, this is your personalized training plan designed to achieve your goal.",
          "sessions": [
            { "day": "Monday", "workout": "5km Easy Run", "notes": "Maintain a conversational pace (~70% effort)." },
            { "day": "Tuesday", "workout": "Intervals: 6x800m at race pace", "notes": "Take a 2-minute jog between intervals." },
            { "day": "Wednesday", "workout": "Rest or Cross-Training", "notes": "Focus on recovery with light yoga or cycling." },
            { "day": "Thursday", "workout": "Tempo Run: 6km at threshold pace", "notes": "Run at 80-85% effort to improve stamina." },
            { "day": "Friday", "workout": "5km Easy Run", "notes": "Relaxed conversational pace." },
            { "day": "Saturday", "workout": "Long Run: 12km at an easy pace", "notes": "Focus on endurance. Hydrate well before and after." },
            { "day": "Sunday", "workout": "Rest", "notes": "Full recovery day to prepare for the week ahead." }
          ]
        }
        `;

    const formattedMessages = messages.map((msg: any) => ({
      role: msg.role,
      content:
        typeof msg.content === "object"
          ? JSON.stringify(msg.content)
          : msg.content,
    }));

    if (false) {
      return res.status(201).json({
        recommendation:
          "Based on your input, this is your personalized training plan designed to achieve your goal.",
        sessions: [
          {
            day: "Monday",
            workout: "5km Easy Run",
            notes: "Maintain a conversational pace (~70% effort).",
          },
          {
            day: "Wednesday",
            workout: "Intervals: 4x800m at race pace",
            notes: "Take a 2-minute jog between intervals.",
          },
          {
            day: "Saturday",
            workout: "Long Run: 10km at an easy pace",
            notes: "Focus on endurance. Keep your pace relaxed.",
          },
        ],
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: prompt }, ...formattedMessages],
    });

    console.log(JSON.parse(response.choices[0].message.content));

    const plan = JSON.parse(response.choices[0].message.content);

    res.status(201).json(plan);
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

const mockData = {
  type: "assistant",
  content: {
    recommendation:
      "Based on your input, this is your personalized training plan designed to achieve your goal.",
    sessions: [
      {
        day: "Monday",
        workout: "5km Easy Run",
        notes: "Maintain a conversational pace (~70% effort).",
      },
      {
        day: "Tuesday",
        workout: "Cross-Training: 30 minutes",
        notes:
          "Engage in low-impact activities like cycling or swimming to promote recovery.",
      },
      {
        day: "Wednesday",
        workout: "Intervals: 4x800m at race pace",
        notes: "Take a 2-minute jog between intervals.",
      },
      {
        day: "Thursday",
        workout: "5km Easy Run",
        notes: "Keep the pace comfortable, focusing on technique.",
      },
      {
        day: "Friday",
        workout: "Rest or Light Jog: 20-30 minutes",
        notes: "Listen to your body; gentle movement helps recovery.",
      },
      {
        day: "Saturday",
        workout: "Long Run: 10km at an easy pace",
        notes: "Focus on endurance. Keep your pace relaxed.",
      },
      {
        day: "Sunday",
        workout: "5km Recovery Run",
        notes: "A relaxed pace to promote recovery for the upcoming week.",
      },
    ],
  },
};
