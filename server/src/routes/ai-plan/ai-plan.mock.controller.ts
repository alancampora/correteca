import { Request, Response } from "express";

const mock21Kdata3months = {
  recommendation:
    "Based on your input and a 3-month timeframe, this is your personalized training plan designed to help you achieve your goal of running a 21k under 2 hours. The plan includes progressive phases for endurance, speed, and stamina development, culminating in peak performance for race day.",
  weeks: [
    {
      week: 1,
      workouts: [
        {
          day: "Monday",
          workout: "5km Easy Run",
          notes: "Maintain a conversational pace (~6:15/km).",
        },
        {
          day: "Wednesday",
          workout: "Intervals: 5x800m at race pace",
          notes:
            "Run each interval at 5:30/km. Take a 2-minute jog between intervals.",
        },
        {
          day: "Friday",
          workout: "4km Tempo Run",
          notes: "Run at 5:45/km to improve stamina.",
        },
        {
          day: "Sunday",
          workout: "Long Run: 10km at an easy pace",
          notes: "Focus on endurance. Keep your pace relaxed (~6:20/km).",
        },
      ],
    },
    {
      week: 2,
      workouts: [
        {
          day: "Monday",
          workout: "6km Easy Run",
          notes: "Maintain a conversational pace (~6:15/km).",
        },
        {
          day: "Wednesday",
          workout: "Intervals: 6x800m at race pace",
          notes:
            "Run each interval at 5:25/km. Take a 2-minute jog between intervals.",
        },
        {
          day: "Friday",
          workout: "5km Tempo Run",
          notes: "Run at 5:40/km to improve stamina.",
        },
        {
          day: "Sunday",
          workout: "Long Run: 12km at an easy pace",
          notes: "Build endurance with a steady pace (~6:10/km).",
        },
      ],
    },
    {
      week: 3,
      workouts: [
        {
          day: "Monday",
          workout: "6km Easy Run",
          notes: "Maintain a conversational pace (~6:15/km).",
        },
        {
          day: "Wednesday",
          workout: "Intervals: 5x1km at race pace",
          notes:
            "Run each interval at 5:25/km. Take a 2-minute jog between intervals.",
        },
        {
          day: "Friday",
          workout: "6km Tempo Run",
          notes: "Run at 5:40/km to improve stamina.",
        },
        {
          day: "Sunday",
          workout: "Long Run: 14km at an easy pace",
          notes: "Focus on endurance with a steady pace (~6:10/km).",
        },
      ],
    },
    {
      week: 4,
      workouts: [
        {
          day: "Monday",
          workout: "7km Easy Run",
          notes: "Maintain a conversational pace (~6:10/km).",
        },
        {
          day: "Wednesday",
          workout: "Intervals: 6x1km at race pace",
          notes:
            "Run each interval at 5:20/km. Take a 2-minute jog between intervals.",
        },
        {
          day: "Friday",
          workout: "6km Tempo Run",
          notes: "Run at 5:35/km to improve stamina.",
        },
        {
          day: "Sunday",
          workout: "Long Run: 16km at an easy pace",
          notes: "Build endurance with a steady pace (~6:00/km).",
        },
      ],
    },
    {
      week: 5,
      workouts: [
        {
          day: "Monday",
          workout: "7km Easy Run",
          notes: "Maintain a conversational pace (~6:10/km).",
        },
        {
          day: "Wednesday",
          workout: "Intervals: 7x1km at race pace",
          notes:
            "Run each interval at 5:20/km. Take a 2-minute jog between intervals.",
        },
        {
          day: "Friday",
          workout: "6km Tempo Run",
          notes: "Run at 5:30/km to improve stamina.",
        },
        {
          day: "Sunday",
          workout: "Long Run: 18km at an easy pace",
          notes: "Build endurance with a steady pace (~6:00/km).",
        },
      ],
    },
    {
      week: 6,
      workouts: [
        {
          day: "Monday",
          workout: "7km Easy Run",
          notes: "Maintain a conversational pace (~6:10/km).",
        },
        {
          day: "Wednesday",
          workout: "Intervals: 8x800m at race pace",
          notes:
            "Run each interval at 5:15/km. Take a 90-second jog between intervals.",
        },
        {
          day: "Friday",
          workout: "7km Tempo Run",
          notes: "Run at 5:30/km to build stamina and lactate threshold.",
        },
        {
          day: "Sunday",
          workout: "Long Run: 20km at an easy pace",
          notes: "Focus on endurance with a steady pace (~6:00/km).",
        },
      ],
    },
    {
      week: 7,
      workouts: [
        {
          day: "Monday",
          workout: "8km Easy Run",
          notes: "Maintain a conversational pace (~6:10/km).",
        },
        {
          day: "Wednesday",
          workout: "Intervals: 8x1km at race pace",
          notes:
            "Run each interval at 5:15/km. Take a 2-minute jog between intervals.",
        },
        {
          day: "Friday",
          workout: "7km Tempo Run",
          notes: "Run at 5:30/km to improve stamina and endurance.",
        },
        {
          day: "Sunday",
          workout: "Long Run: 21km Race Simulation",
          notes: "Run at your goal race pace (~5:40/km).",
        },
      ],
    },
    {
      week: 8,
      workouts: [
        {
          day: "Monday",
          workout: "6km Easy Run",
          notes: "Maintain a conversational pace (~6:10/km).",
        },
        {
          day: "Wednesday",
          workout: "Intervals: 6x1km at race pace",
          notes:
            "Run each interval at 5:15/km. Take a 2-minute jog between intervals.",
        },
        {
          day: "Friday",
          workout: "5km Tempo Run",
          notes: "Run at 5:35/km to improve stamina.",
        },
        {
          day: "Sunday",
          workout: "Long Run: 18km at an easy pace",
          notes: "Focus on endurance with a steady pace (~6:00/km).",
        },
      ],
    },
    {
      week: 9,
      workouts: [
        {
          day: "Monday",
          workout: "6km Easy Run",
          notes: "Maintain a conversational pace (~6:10/km).",
        },
        {
          day: "Wednesday",
          workout: "Intervals: 5x1km at race pace",
          notes:
            "Run each interval at 5:15/km. Take a 2-minute jog between intervals.",
        },
        {
          day: "Friday",
          workout: "5km Easy Run",
          notes: "Relaxed pace to recover (~6:20/km).",
        },
        {
          day: "Sunday",
          workout: "Long Run: 10km at an easy pace",
          notes: "Tapering week; keep it relaxed.",
        },
      ],
    },
    {
      week: 10,
      workouts: [
        {
          day: "Monday",
          workout: "5km Easy Run",
          notes: "Maintain a relaxed pace (~6:15/km).",
        },
        {
          day: "Wednesday",
          workout: "Intervals: 4x800m at race pace",
          notes:
            "Run each interval at 5:15/km. Take a 2-minute jog between intervals.",
        },
        {
          day: "Friday",
          workout: "4km Easy Run",
          notes:
            "Relaxed conversational pace to prepare for race day (~6:20/km).",
        },
        {
          day: "Sunday",
          workout: "Race Day: 21km",
          notes: "Run at your planned race pace (~5:40/km).",
        },
      ],
    },
  ],
};


const mock10Kunder50minutesTwoMonths = {
  "recommendation": "Based on your input, this is your personalized training plan designed to achieve your goal.",
  "weeks": [
    {
      "week": 1,
      "workouts": [
        {
          "day": "Monday",
          "workout": "5km Easy Run",
          "notes": "Maintain a conversational pace (~70% effort)."
        },
        {
          "day": "Wednesday",
          "workout": "Intervals: 6x400m at race pace",
          "notes": "Run each interval at 4:50/km pace. Take a 90-second jog between intervals."
        },
        {
          "day": "Friday",
          "workout": "Tempo Run: 6km at threshold pace",
          "notes": "Run at 80% effort (~5:00/km pace)."
        },
        {
          "day": "Sunday",
          "workout": "Long Run: 10km at an easy pace",
          "notes": "Focus on endurance and hydration. Keep your pace relaxed (~6:00/km)."
        }
      ]
    },
    {
      "week": 2,
      "workouts": [
        {
          "day": "Monday",
          "workout": "6km Easy Run",
          "notes": "Maintain a conversational pace."
        },
        {
          "day": "Wednesday",
          "workout": "Intervals: 8x400m at race pace",
          "notes": "Run each interval at 4:50/km pace. Take a 90-second jog between intervals."
        },
        {
          "day": "Friday",
          "workout": "Tempo Run: 7km at threshold pace",
          "notes": "Run at 80% effort (~5:00/km pace)."
        },
        {
          "day": "Sunday",
          "workout": "Long Run: 12km at an easy pace",
          "notes": "Focus on endurance. Keep your pace relaxed."
        }
      ]
    },
    {
      "week": 3,
      "workouts": [
        {
          "day": "Monday",
          "workout": "6km Easy Run",
          "notes": "Maintain a conversational pace."
        },
        {
          "day": "Wednesday",
          "workout": "Intervals: 4x800m at race pace",
          "notes": "Run each interval at 4:50/km pace. Take a 2-minute jog between intervals."
        },
        {
          "day": "Friday",
          "workout": "Tempo Run: 8km at threshold pace",
          "notes": "Run at 80% effort (~5:00/km pace)."
        },
        {
          "day": "Sunday",
          "workout": "Long Run: 14km at an easy pace",
          "notes": "Focus on endurance. Keep your pace relaxed."
        }
      ]
    },
    {
      "week": 4,
      "workouts": [
        {
          "day": "Monday",
          "workout": "7km Easy Run",
          "notes": "Maintain a conversational pace."
        },
        {
          "day": "Wednesday",
          "workout": "Intervals: 6x800m at race pace",
          "notes": "Run each interval at 4:50/km pace. Take a 2-minute jog between intervals."
        },
        {
          "day": "Friday",
          "workout": "Tempo Run: 9km at threshold pace",
          "notes": "Run at 80% effort (~5:00/km pace)."
        },
        {
          "day": "Sunday",
          "workout": "Long Run: 16km at an easy pace",
          "notes": "Focus on endurance. Keep your pace relaxed."
        }
      ]
    },
    {
      "week": 5,
      "workouts": [
        {
          "day": "Monday",
          "workout": "7km Easy Run",
          "notes": "Maintain a conversational pace."
        },
        {
          "day": "Wednesday",
          "workout": "Intervals: 5x1000m at race pace",
          "notes": "Run each interval at 4:50/km pace. Take a 2-minute jog between intervals."
        },
        {
          "day": "Friday",
          "workout": "Tempo Run: 10km at threshold pace",
          "notes": "Run at 80% effort (~5:00/km pace)."
        },
        {
          "day": "Sunday",
          "workout": "Long Run: 18km at an easy pace",
          "notes": "Focus on endurance. Keep your pace relaxed."
        }
      ]
    },
    {
      "week": 6,
      "workouts": [
        {
          "day": "Monday",
          "workout": "8km Easy Run",
          "notes": "Maintain a conversational pace."
        },
        {
          "day": "Wednesday",
          "workout": "Intervals: 8x400m at race pace",
          "notes": "Run each interval at 4:50/km pace. Take a 90-second jog between intervals."
        },
        {
          "day": "Friday",
          "workout": "Tempo Run: 10km at threshold pace",
          "notes": "Run at 80% effort (~5:00/km pace)."
        },
        {
          "day": "Sunday",
          "workout": "Long Run: 10km at race pace",
          "notes": "Aim for 5:00/km pace for the entire distance."
        }
      ]
    },
    {
      "week": 7,
      "workouts": [
        {
          "day": "Monday",
          "workout": "5km Easy Run",
          "notes": "Maintain a conversational pace."
        },
        {
          "day": "Wednesday",
          "workout": "Final Intervals: 4x800m at race pace",
          "notes": "Run at 4:50/km pace. Take a 2-minute jog between intervals."
        },
        {
          "day": "Friday",
          "workout": "Race Simulation: 10km at race pace",
          "notes": "Aim for your goal of 50 minutes (5:00/km pace)."
        },
        {
          "day": "Sunday",
          "workout": "Rest or very light jog",
          "notes": "Focus on recovery and hydration."
        }
      ]
    },
    {
      "week": 8,
      "workouts": [
        {
          "day": "Monday",
          "workout": "5km Easy Run",
          "notes": "Maintain a conversational pace."
        },
        {
          "day": "Wednesday",
          "workout": "3x1000m at race pace",
          "notes": "Run at 4:50/km pace. Rest 2 minutes in between."
        },
        {
          "day": "Friday",
          "workout": "Short Tempo: 5km at threshold pace",
          "notes": "Run at 80% effort (~5:00/km pace)."
        },
        {
          "day": "Sunday",
          "workout": "Race Day: 10km",
          "notes": "Aim for under 50 minutes. Focus on pacing from the start!"
        }
      ]
    }
  ]
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const generateAIPlan = async (req: Request, res: Response) => {
  await sleep(5000);
  res.status(200).json(mock21Kdata3months);
};
