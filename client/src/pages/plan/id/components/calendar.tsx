import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import WorkoutCard from "./workout-card"

interface Workout {
  day: string
  workout: string
  notes: string
}

interface Week {
  week: number
  workouts: Workout[]
}

interface TrainingPlanProps {
  weeks: Week[]
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function TrainingPlan({ weeks }: TrainingPlanProps) {
  const [activeWeek, setActiveWeek] = useState(1)

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
      <div className="hidden md:block overflow-x-auto mt-4">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 border"></th>
              {weeks.map((week) => (
                <th key={week.week} className="p-2 border">
                  Week {week.week}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {daysOfWeek.map((day) => (
              <tr key={day}>
                <td className="p-2 border font-medium">{day}</td>
                {weeks.map((week) => {
                  const workout = week.workouts.find((w) => w.day === day)
                  return (
                    <td key={`${week.week}-${day}`} className="p-2 border">
                      {workout && <WorkoutCard {...workout} />}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
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
                  const workout = week.workouts.find((w) => w.day === day)
                  return (
                    <div key={day} className="border-b pb-2 last:border-b-0">
                      <div className="font-medium">{day}</div>
                      {workout ? (
                        <WorkoutCard {...workout} />
                      ) : (
                        <div className="text-sm text-muted-foreground">Rest day</div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

