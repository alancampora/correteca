import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import UserLayout from "@/components/user-layout";

interface Plan {
  _id: string;
  goal: string;
  frequency: number;
  intensity: string;
  plan: {
    recommendation: string;
    sessions: { day: string; workout: string }[];
  };
}

const PlansPage: React.FC = () => {
  const { user } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const navigate = useNavigate();

  // Fetch plans from the API
  const fetchPlans = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/ai-plan/?userId=${user?._id}`);
      if (!response.ok) throw new Error("Failed to fetch plans");
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (

    <UserLayout title="Your running plans">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your AI-Generated Plans</h1>
          <Button onClick={() => navigate("/plan/create")}>Create New Plan</Button>
        </div>

        {plans.length === 0 ? (
          <p className="text-gray-500">No plans found. Click "Create New Plan" to add one!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <Card key={plan._id} className="shadow-md">
                <CardHeader>
                  <CardTitle>{plan.goal}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-2">
                    Frequency: {plan.frequency} days/week
                  </p>
                  <p className="text-sm text-gray-500 mb-2">Intensity: {plan.intensity}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    {plan.plan.recommendation}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/plan/${plan._id}`)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default PlansPage;
