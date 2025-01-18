import { Request, Response } from "express";

// Mock data for testing getUserAIPlans
const mockPlans = [
  {
    userId: "12345",
    goal: "Run a half-marathon under 2 hours",
    frequency: 5,
    intensity: "Moderate",
    plan: [
      { day: "Monday", workout: "Tempo Run", details: "4km at 5:15/km pace" },
      {
        day: "Tuesday",
        workout: "Interval Training",
        details: "6x400m at 4:30/km pace",
      },
      { day: "Wednesday", workout: "Easy Run", details: "5km at 6:30/km pace" },
      { day: "Friday", workout: "Long Run", details: "15km at 6:20/km pace" },
    ],
    createdAt: "2025-01-11T10:00:00.000Z",
    updatedAt: "2025-01-11T10:00:00.000Z",
  },
  {
    userId: "12345",
    goal: "Run a 10k under 50 minutes",
    frequency: 3,
    intensity: "Easy",
    plan: [
      { day: "Monday", workout: "Easy Run", details: "3km at 7:00/km pace" },
      {
        day: "Wednesday",
        workout: "Tempo Run",
        details: "4km at 5:30/km pace",
      },
      { day: "Saturday", workout: "Long Run", details: "10km at 6:30/km pace" },
    ],
    createdAt: "2025-01-10T10:00:00.000Z",
    updatedAt: "2025-01-10T10:00:00.000Z",
  },
];

// Mock function to generate a new AI running plan
export const generateAIPlan = async (req: Request, res: Response) => {
  const { userId, goal, frequency, intensity, trainings } = req.body;

  try {
    // Mock logic to generate a plan based on the inputs
    const generatedPlan = mockGenerateAIPlan(goal, frequency, intensity);

    console.log({ generatedPlan, goal, frequency, intensity, trainings });

    // Simulate saving the plan to MongoDB
    const mockSavedPlan = {
      userId,
      goal,
      frequency,
      intensity,
      plan: generatedPlan,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    res.status(201).json(mockSavedPlan);
  } catch (error) {
    console.error("Error generating AI plan:", error);
    res.status(500).json({ message: "Failed to generate AI plan" });
  }
};

// Mock function to generate a running plan based on goal, frequency, and intensity
const mockGenerateAIPlan = (
  goal: string,
  frequency: number,
  intensity: "Easy" | "Moderate" | "Hard",
) => {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const workouts = {
    Easy: [
      { type: "Easy Run", details: "5km at a conversational pace (~6:30/km)" },
      { type: "Recovery Run", details: "3km at ~7:00/km pace" },
    ],
    Moderate: [
      { type: "Tempo Run", details: "4km at 5:15/km pace" },
      { type: "Interval Training", details: "6x400m at 4:30/km pace" },
    ],
    Hard: [
      {
        type: "Hill Repeats",
        details: "10x200m uphill sprints with jog back recovery",
      },
      { type: "Long Run", details: "15km at 6:20/km pace" },
    ],
  };

  // Generate a plan for the selected frequency
  const plan = [];
  for (let i = 0; i < frequency; i++) {
    const dayIndex = i % daysOfWeek.length; // Rotate through the days of the week
    const workoutType = workouts[intensity][i % workouts[intensity].length];

    plan.push({
      day: daysOfWeek[dayIndex],
      workout: workoutType.type,
      details: workoutType.details,
    });
  }

  return plan;
};

// Mock function to get all AI plans for a specific user
export const getUserAIPlans = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    // Filter mock plans by userId
    const userPlans = mockPlans.filter((plan) => plan.userId === userId);

    res.status(200).json(userPlans);
  } catch (error) {
    console.error("Error fetching mock AI plans:", error);
    res.status(500).json({ message: "Failed to fetch AI plans" });
  }
};
