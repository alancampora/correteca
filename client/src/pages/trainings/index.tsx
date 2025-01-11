import RunningIcon from "@/components/icons/running";
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

  const handleEditTrainig = (id: string) => {
    navigate(`/trainings/edit/${id}`)
  }

  console.log({ trainings })
  return (
    <UserLayout title="Trainings">
      <button
        className="bg-black text-white px-4 py-2 rounded"
        onClick={handleAddTraining}
      >
        + Add Training
      </button>
      <div className="mt-4">
        {trainings.length === 0 ? (
          <p>No trainings available.</p>
        ) : (
          <ul>
            {trainings.map((training: Training, index: number) => (
              <li key={index} className="bg-stone-100 shadow p-4 m-4" onClick={() => handleEditTrainig(training._id)}>

                <div className="text-lg flex flex-row space-x-2">
                  <p>{new Date(training.date).toLocaleDateString()}</p>
                  <p>{training.title}</p>
                </div>

                <div className="border-l-4 border-orange-600 my-4" >
                  <div className="flex flex-row items-center">
                    <div className="min-h-[80px] text-xl font-bold flex flex-row items-center space-x-2 border-r-2 border-stone-200 p-2">
                      <RunningIcon className="w-16 h-16" />
                      <p>{training.totalDistance} km</p>
                    </div>
                    {/* <div className="text-xl font-bold uppercase border-r-2 border-stone-200 p-2 items-center min-h-[80px] flex items-center p-2">
                      <p>{training.totalDistance} km</p>
                    </div>
 */}
                    <div className="text-md items-center min-h-[80px] flex items-center p-2">
                      <p>Notes: {training.notes}</p>
                    </div>

                  </div>
                </div>

              </li>
            ))}
          </ul>
        )}
      </div>
    </UserLayout>
  );
};

export default TrainingsPage;
