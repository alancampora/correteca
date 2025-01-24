import AnimatedText from "@/components/animated-text";
import Robot from "@/components/icons/robot";
import { Avatar } from "@/components/ui/avatar";
import React, { useState, useEffect } from "react";

type Plan = {
  recommendation: string;
  weeks: [
    {
      week: number;
      workouts: [
        {
          day: number;
          workout: string;
          notes: string;
        },
      ];
    },
  ];
};

const PlanRenderer: React.FC<{ plan: Plan }> = ({ plan }) => {
  const [renderedWeeks, setRenderedWeeks] = useState<number>(0); // Tracks how many weeks to show
  const [isRecommendationComplete, setIsRecommendationComplete] =
    useState(false);

  useEffect(() => {
    if (isRecommendationComplete) {
      const timer = setInterval(() => {
        setRenderedWeeks((prev) => {
          if (prev < plan.weeks.length) {
            return prev + 1;
          }
          clearInterval(timer);
          return prev;
        });
      }, 500); // Adjust interval for timing between week animations
      return () => clearInterval(timer);
    }
  }, [isRecommendationComplete, plan.weeks.length]);

  return (
    <div className="p-2">
      <div className="flex flex-row space-x-2">
        <Avatar className="border-2 border-indigo-500">
          <Robot className="w-12 h-12 mx-auto" />
        </Avatar>
        <div className="text-md bg-indigo-100 rounded p-2">
          <AnimatedText
            className=""
            text={plan.recommendation}
            speed={15}
            onComplete={() => setIsRecommendationComplete(true)}
          />
        </div>
      </div>
      {/* Render Weeks */}
      <div className="mt-4">
        {isRecommendationComplete &&
          plan.weeks.slice(0, renderedWeeks).map((week) => (
            <div
              key={week.week}
              className="mt-4 animate-fade-in p-2 bg-indigo-100 rounded"
            >
              <p className="text-lg font-semibold">Week {week.week}</p>
              <div className="mt-2">
                {week.workouts.map((workout) => (
                  <div key={workout.day} className="mt-2">
                    <p className="text-md font-semibold">Day {workout.day}</p>
                    <p className="text-sm">{workout.workout}</p>
                    <p className="text-sm">{workout.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlanRenderer;
