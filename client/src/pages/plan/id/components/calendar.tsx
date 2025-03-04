import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import WorkoutCard from "./workout-card";

interface Workout {
  day: string;
  workout: string;
  notes: string;
}

interface Week {
  week: number;
  workouts: Workout[];
}

interface TrainingPlanProps {
  weeks: Week[];
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Helper function to split weeks into chunks
function chunkWeeks(weeks: Week[], size: number): Week[][] {
  const chunks: Week[][] = [];
  for (let i = 0; i < weeks.length; i += size) {
    chunks.push(weeks.slice(i, i + size));
  }
  return chunks;
}

export default function TrainingPlan({ weeks }: TrainingPlanProps) {
  const [activeWeek, setActiveWeek] = useState(1);
  const chunkedWeeks = chunkWeeks(weeks, 4); // Split weeks into chunks of 4

  return (
    <div>
      {/* Mobile week selector */}
      <div className="sticky top-0 z-10 bg-background p-2 md:hidden">
        <select
          className="w-full rounded-md border p-2"
          value={activeWeek}
          onChange={(e) => setActiveWeek(Number(e.target.value))}
        >
          {weeks.map((week) => (
            <option key={week.week} value={week.week}>
              Week {week.week}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop view */}
      <div className="hidden md:block overflow-x-auto space-y-8">
        {chunkedWeeks.map((weekChunk, index) => (
          <div key={index} className="mt-4">
            <Table>

              <TableHeader>
                <TableRow>
                  <TableHead className="p-2 border bg-indigo-100">Day</TableHead>
                  {weekChunk.map((week) => (
                    <TableHead key={week.week} className="p-2 border bg-indigo-100">
                      Week {week.week}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {daysOfWeek.map((day) => (
                  <TableRow key={day}>
                    <TableCell className="p-2 border font-medium bg-indigo-100">{day}</TableCell>
                    {weekChunk.map((week) => {
                      const workout = week.workouts.find((w) => w.day === day);
                      const maxWidth = weekChunk.length === 4 ? "w-1/4" : `w-1/${weekChunk.length}`;
                      return (
                        <TableCell key={`${week.week}-${day}`} className={`p-2 border ${maxWidth}`}>
                          {workout ? (
                            <WorkoutCard {...workout} />
                          ) : (
                            <div className="text-sm text-muted-foreground">Rest day</div>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        {weeks.map((week) => (
          <Card key={week.week} className={`mb-4 ${week.week === activeWeek ? "block" : "hidden"}`}>
            <CardHeader>
              <CardTitle>Week {week.week}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {daysOfWeek.map((day) => {
                  const workout = week.workouts.find((w) => w.day === day);
                  return (
                    <div key={day} className="border-b pb-2 last:border-b-0">
                      <div className="font-medium">{day}</div>
                      {workout ? (
                        <WorkoutCard {...workout} />
                      ) : (
                        <div className="text-sm text-muted-foreground">Rest day</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
