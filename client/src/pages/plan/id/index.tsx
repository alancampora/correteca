import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import UserLayout from "@/components/user-layout";
import ScoreCard from "./components/score-card";
import Calendar from "./components/calendar";

interface Plan {
  _id: string;
  goal: string;
  frequency: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  timeRestriction: string;
  plan: {
    recommendation?: string;
    weeks: {
      week: number;
      workouts: {
        day: string;
        workout: string;
        notes: string;
      }[];
    }[];
  };
}

const PlanDetails: React.FC = () => {
  const { user } = useAuth();
  const { planId } = useParams<{ planId: string }>();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = user._id; // Replace with authenticated user ID

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/ai-plan/${planId}?userId=${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch the plan");

        const data = await response.json();
        setPlan(data);
      } catch (err) {
        console.error("Error fetching the plan:", err);
        setError("Failed to load the plan. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [planId]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!plan) {
    return <p className="text-center">No plan found.</p>;
  }

  return (
    <UserLayout title="Training Plan">
      <div className="flex justify-center p-2 rounded bg-amber-100 m-2">
        <p className="text-xl font-semibold italic">Goal: {plan.goal}</p>
      </div>
      <div className="flex flex-row space-x-4 mx-auto justify-center mt-4">
        <ScoreCard
          title="Training Frequency"
          content={`${plan.frequency} days/week`}
        />
        <ScoreCard
          title="Level"
          content={plan.level}
        />
        <ScoreCard
          title="Time Restriction"
          content={plan.timeRestriction}
        />
      </div>
      <Calendar weeks={plan.plan.weeks} />
    </UserLayout >
  );
};

export default PlanDetails;
