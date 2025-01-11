import UserLayout from "@/components/user-layout";
import { Training } from "@common/Training";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TrainingsPage = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/trainings`,
        );
        const data = await response.json();
        setTrainings(data);
      } catch (error) {
        console.error("Error fetching trainings:", error);
      }
    };

    fetchTrainings();
  }, []);

  const handleAddTraining = () => {
    navigate("/trainings/new");
  };

  return (
    <UserLayout title="Trainings">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAddTraining}
      >
        + Add Training
      </button>
      <div className="mt-4">
        {trainings.length === 0 ? (
          <p>No trainings available.</p>
        ) : (
          <ul>
            {trainings.map((training: Training) => (
              <li key={training._id} className="border-b py-2">
                <p>Title: {training.title}</p>
                <p>Date: {new Date(training.date).toLocaleDateString()}</p>
                <p>Total Distance: {training.totalDistance} km</p>
                <p>Notes: {training.notes}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </UserLayout>
  );
};

export default TrainingsPage;
