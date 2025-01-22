import RunningIcon from "@/components/icons/running";
import UserLayout from "@/components/user-layout";
import { Training } from "@common/Training";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TrashIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";

const TrainingsPage = () => {
  const {user}= useAuth();
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTrainingId, setSelectedTrainingId] = useState<string | null>(
    null,
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/trainings/user/${user._id}`,
        );
        const data = await response.json();
        setTrainings(data);
      } catch (error) {
        console.error("Error fetching trainings:", error);
      }
    };

    fetchTrainings();
  }, [user]);

  const handleAddTraining = () => {
    navigate("/trainings/new");
  };

  const handleEditTraining = (id: string) => {
    navigate(`/trainings/edit/${id}`);
  };

  const confirmDeleteTraining = (id: string) => {
    setSelectedTrainingId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteTraining = async () => {
    if (selectedTrainingId) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/trainings/${selectedTrainingId}`,
          { method: "DELETE" },
        );
        if (response.ok) {
          setTrainings(
            trainings.filter((training) => training._id !== selectedTrainingId),
          );
        } else {
          console.error("Failed to delete training");
        }
      } catch (error) {
        console.error("Error deleting training:", error);
      } finally {
        setShowDeleteModal(false);
        setSelectedTrainingId(null);
      }
    }
  };

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
              <li key={index} className="mb-4">
                <div className="text-md flex flex-row justify-between space-x-2 bg-stone-100 p-2 rounded-t-md text-bold">
                  <p>{training.title}</p>
                  <p>{new Date(training.date).toISOString().split("T")[0]}</p>
                </div>

                <div className="bg-stone-100 p-2 flex justify-between items-center">
                  <div
                    onClick={() => handleEditTraining(training._id)}
                    className="cursor-pointer w-full"
                  >
                    <div className="border-l-4 border-orange-600 my-4">
                      <div className="flex flex-row items-center">
                        <div className="min-h-[100px]  text-xl font-bold flex flex-row items-center space-x-2 border-r-2 border-stone-200 p-2">
                          <RunningIcon className="w-16 h-16" />
                          <p>{training.totalDistance} km</p>
                        </div>
                        <div className="text-md items-center min-h-[80px] flex items-center p-2">
                          <p>{training.notes}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Delete Button */}
                  <button
                    onClick={() => confirmDeleteTraining(training._id)}
                    className="ml-4 p-2 rounded-full bg-red-100 hover:bg-red-200"
                  >
                    <TrashIcon className="h-6 w-6 text-red-600" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this training?</p>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteTraining}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </UserLayout>
  );
};

export default TrainingsPage;
