import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { Training, Lap } from "@common/Training";
import UserLayout from "@/components/user-layout";
import { TrashIcon, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface TrainingCardProps {
  training: Training;
  user: {
    name: string;
    avatar: string;
  };
}

const averagePace = (laps: Lap[]) =>
  (laps.reduce((acc, lap) => acc + parseFloat(lap.pace.split("/")[0]), 0) /
    laps.length
  ).toFixed(2);


const totalTime = (laps: Lap[]) => laps
  .map((lap) => lap.time.split(":").reduce((acc, time) => 60 * acc + +time, 0))
  .reduce((acc, seconds) => acc + seconds, 0);

const formattedTime = (totalTime: number) => `${Math.floor(totalTime / 3600)}h ${Math.floor(
  (totalTime % 3600) / 60
)}m`;


const TrainingCard: React.FC<TrainingCardProps> = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTrainingId, setSelectedTrainingId] = useState<string | null>(
    null,
  );

  const confirmDeleteTraining = (id: string) => {
    setSelectedTrainingId(id);
    setShowDeleteModal(true);
  };

  const handleAddTraining = () => {
    navigate("/trainings/new");
  };

  const handleEditTraining = (id: string) => {
    navigate(`/trainings/edit/${id}`);
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



  return (
    <UserLayout title="trainigs">
      <button
        className="bg-black text-white px-4 py-2 rounded"
        onClick={handleAddTraining}
      >
        + Add Training
      </button>
      {trainings?.map((training) => (
        <Card className="max-w-lg mx-auto m-4 shadow justify-self-center">
          {/* Header Section */}
          <CardHeader className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold flex items-center space-x-2">
              <span role="img" aria-label="running">
                🏃
              </span>
              {training.title}
            </h2>
          </CardHeader>

          <Separator />

          {/* Content Section */}
          <CardContent>
            <div className="mt-4">
              {/* Metrics */}
              <div className="grid grid-cols-3 text-center">
                <div>
                  <p className="text-lg font-bold">{training.totalDistance.toFixed(2)} km</p>
                  <p className="text-sm text-muted-foreground">Distance</p>
                </div>
                <div>
                  <p className="text-lg font-bold">{averagePace(training.laps)} /km</p>
                  <p className="text-sm text-muted-foreground">Avg Pace</p>
                </div>
                <div>
                  <p className="text-lg font-bold">{formattedTime(totalTime(training.laps))}</p>
                  <p className="text-sm text-muted-foreground">Total Time</p>
                </div>
              </div>

              {/* Notes */}
              <div className="mt-2 bg-indigo-100 text-indigo-600 p-3 rounded-md">
                {training.notes || "No additional notes provided."}
              </div>

              {/* Laps */}
              <div className="mt-2">
                <div className="p-2">
                  <h3 className="text-md font-bold">Laps</h3>
                  <ul className="list-disc list-inside text-sm">
                    {training.laps.map((lap, index) => (
                      <li key={index}>
                        {lap.distance} km - {lap.time} - {lap.pace}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex space-x-2 justify-end mt-2">
                <Button variant="outline" size="icon" onClick={() =>
                  handleEditTraining(training._id)
                }>
                  <Pencil className="h-6 w-6 text-green-600" />
                </Button>
                <Button variant="outline" size="icon"
                  onClick={() => confirmDeleteTraining(training._id)}>
                  <TrashIcon className="h-6 w-6 text-red-600" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

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
  )
};

export default TrainingCard;
