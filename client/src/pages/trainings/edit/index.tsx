import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserLayout from "@/components/user-layout";
import TrainingForm from "../components/form";

const EditTrainingPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/trainings/${id}`);
        const data = await response.json();
        setInitialData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (data: {
    title: string;
    date: string;
    laps: any[];
    notes: string;
  }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/trainings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update training");
      }

      navigate("/trainings");
    } catch (error) {
      console.error(error);
    }
  };

  if (!initialData) {
    return <div>Loading...</div>;
  }

  return (
    <UserLayout title="Edit Training">
      <TrainingForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitLabel="Update Training"
      />
    </UserLayout>
  );
};

export default EditTrainingPage;