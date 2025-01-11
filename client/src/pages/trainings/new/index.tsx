import React from "react";
import { useNavigate } from "react-router-dom";
import UserLayout from "@/components/user-layout";
import TrainingForm from "../components/form";
import { useAuth } from "../../../context/auth";

const NewTrainingPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (data: {
    title: string;
    date: string;
    laps: any[];
    notes: string;
  }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/trainings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...data,
          userId: user?._id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create training");
      }

      navigate("/trainings");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserLayout title="New Training">
      <TrainingForm onSubmit={handleSubmit} submitLabel="Create Training" />
    </UserLayout>
  );
};

export default NewTrainingPage;