import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserLayout from '@/components/user-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../../../context/auth';

interface Lap {
    distance: number;
    time: string; // in format "MM:SS"
    pace: string; // calculated field
}

const NewTrainingPage: React.FC = () => {

    const { user } = useAuth();
    const [date, setDate] = useState('');
    const [laps, setLaps] = useState<Lap[]>([]);
    const [lapDistance, setLapDistance] = useState('');
    const [lapTime, setLapTime] = useState('');
    const [notes, setNotes] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const totalDistance = laps.reduce((acc, lap) => acc + lap.distance, 0);

    const calculatePace = (distance: number, time: string): string => {
        const [minutes, seconds] = time.split(':').map(Number);
        const totalMinutes = minutes + seconds / 60;
        const pace = totalMinutes / distance;
        const paceMinutes = Math.floor(pace);
        const paceSeconds = Math.round((pace - paceMinutes) * 60);
        return `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}`;
    };

    const handleAddLap = () => {
        const distance = parseFloat(lapDistance);
        if (isNaN(distance) || distance <= 0) {
            setError('Please enter a valid distance greater than 0');
            return;
        }
        
        if (!lapTime.match(/^\d{1,2}:\d{2}$/)) {
            setError('Please enter time in MM:SS format (e.g., 5:30)');
            return;
        }

        const pace = calculatePace(distance, lapTime);
        setLaps([...laps, { distance, time: lapTime, pace }]);
        setLapDistance('');
        setLapTime('');
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!date || laps.length === 0) {
            setError('Date and at least one lap are required.');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/trainings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ 
                    date, 
                    totalDistance, 
                    notes, 
                    laps,
                    userId: user?._id
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create training');
            }

            navigate('/trainings');
        } catch (error) {
            console.error('Error creating training:', error);
            setError('Failed to create training. Please try again.');
        }
    };

    return (
        <UserLayout title="New Training">
            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto p-4">
                {error && <p className="text-red-500">{error}</p>}
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
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
                            <Button type="button" onClick={handleAddLap}>
                                + Add Lap
                            </Button>
                        </div>
                        <ul className="mt-2 space-y-2">
                            {laps.map((lap, index) => (
                                <li key={index} className="flex justify-between">
                                    <span>Lap {index + 1}:</span>
                                    <span>{lap.distance} km</span>
                                    <span>{lap.time}</span>
                                    <span>{lap.pace} min/km</span>
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
                    Create Training
                </Button>
            </form>
        </UserLayout>
    );
};

export default NewTrainingPage;

