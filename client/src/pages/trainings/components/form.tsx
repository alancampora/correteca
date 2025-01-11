import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Lap {
  distance: number;
  time: string; // in format "MM:SS"
  pace: string; // calculated field
}

interface TrainingFormProps {
  initialData?: {
    title: string;
    date: string;
    laps: Lap[];
    notes: string;
  };
  onSubmit: (data: {
    title: string;
    date: string;
    laps: Lap[];
    notes: string;
  }) => void;
  submitLabel: string;
}

const TrainingForm: React.FC<TrainingFormProps> = ({
  initialData,
  onSubmit,
  submitLabel,
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [date, setDate] = useState(initialData?.date || "");
  const [laps, setLaps] = useState<Lap[]>(initialData?.laps || []);
  const [lapDistance, setLapDistance] = useState("");
  const [lapTime, setLapTime] = useState("");
  const [editingLapIndex, setEditingLapIndex] = useState<number | null>(null);
  const [notes, setNotes] = useState(initialData?.notes || "");
  const [error, setError] = useState("");

  const totalDistance = laps.reduce((acc, lap) => acc + lap.distance, 0);

  const calculatePace = (distance: number, time: string): string => {
    const [minutes, seconds] = time.split(":").map(Number);
    const totalMinutes = minutes + seconds / 60;
    const pace = totalMinutes / distance;
    const paceMinutes = Math.floor(pace);
    const paceSeconds = Math.round((pace - paceMinutes) * 60);
    return `${paceMinutes}:${paceSeconds.toString().padStart(2, "0")}`;
  };

  const handleAddOrUpdateLap = () => {
    const distance = parseFloat(lapDistance);
    if (isNaN(distance) || distance <= 0) {
      setError("Please enter a valid distance greater than 0");
      return;
    }

    if (!lapTime.match(/^\d{1,2}:\d{2}$/)) {
      setError("Please enter time in MM:SS format (e.g., 5:30)");
      return;
    }

    const pace = calculatePace(distance, lapTime);

    if (editingLapIndex !== null) {
      // Update existing lap
      const updatedLaps = [...laps];
      updatedLaps[editingLapIndex] = { distance, time: lapTime, pace };
      setLaps(updatedLaps);
      setEditingLapIndex(null);
    } else {
      // Add new lap
      setLaps([...laps, { distance, time: lapTime, pace }]);
    }

    setLapDistance("");
    setLapTime("");
    setError("");
  };

  const handleEditLap = (index: number) => {
    const lap = laps[index];
    setLapDistance(lap.distance.toString());
    setLapTime(lap.time);
    setEditingLapIndex(index);
  };

  const handleDeleteLap = (index: number) => {
    setLaps(laps.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !date || laps.length === 0) {
      setError("Title, date, and at least one lap are required.");
      return;
    }

    onSubmit({ title, date, laps, notes });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto p-4">
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <Input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700"
        >
          Date
        </label>
        <Input
          id="date"
          name="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Laps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input
              id="lapDistance"
              name="lapDistance"
              type="number"
              placeholder="Distance (km)"
              value={lapDistance}
              onChange={(e) => setLapDistance(e.target.value)}
            />
            <Input
              id="lapTime"
              name="lapTime"
              type="text"
              placeholder="Time (MM:SS)"
              value={lapTime}
              pattern="\d{1,2}:\d{2}"
              onChange={(e) => setLapTime(e.target.value)}
            />
            <Button type="button" onClick={handleAddOrUpdateLap}>
              {editingLapIndex !== null ? "Update Lap" : "+ Add Lap"}
            </Button>
          </div>
          <ul className="mt-2 space-y-2">
            {laps.map((lap, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>Lap {index + 1}:</span>
                <span>{lap.distance} km</span>
                <span>{lap.time}</span>
                <span>{lap.pace} min/km</span>
                <div className="flex space-x-2">
                  <Button type="button" size="sm" onClick={() => handleEditLap(index)}>
                    Edit
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteLap(index)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-2">Total Distance: {totalDistance} km</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            id="notes"
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes here"
          />
        </CardContent>
      </Card>
      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
};

export default TrainingForm;