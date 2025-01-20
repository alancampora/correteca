import { useState } from "react";
import { Input } from "@/components/ui/input";
import GoalIcon from "@/components/icons/goal";
import CalendarIcon from "@/components/icons/calendar";
import RobotIcon from "@/components/icons/robot";
import FancyStep from "@/components/fancy-step";
import LevelsIcon from "@/components/icons/levels";
import SandClock from "@/components/icons/sand-clock";
import { getGenerateAIPlan } from "@/api/ai-plan";
import LoadingIndicator from "@/components/loading";
import Plan from "./components/plan";
import RadioGroupComponent from "./components/radio-group";

type TPlan = {
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

const TrainingWorkflow: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false); // Tracks the current step
  const [step, setStep] = useState(1); // Tracks the current step
  const [goal, setGoal] = useState(""); // User's goal
  const [plan, setPlan] = useState<TPlan | null>(null);
  const [frequency, setFrequency] = useState("3"); // Training frequency
  const [timeRestriction, setTimeRestriction] = useState<string>("1 month"); // Training frequency
  const [level, setLevel] = useState("Beginner"); // Running level
  const [direction, setDirection] = useState<"forward" | "backward">("forward"); // Animation direction

  const handleNextStep = () => {
    if (step < 6) {
      setDirection("forward");
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setDirection("backward");
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    console.log({
      goal,
      frequency,
      timeRestriction,
      level,
    });

    setIsLoading(true);

    await getGenerateAIPlan({
      data: {
        goal,
        frequency,
        level,
        timeRestriction,
      },
      successCallback: (data: any) => {
        setDirection("forward");
        setStep(step + 1);
        setPlan(data);
        setIsLoading(false);
      },
      errorCallback: () => {
        setIsLoading(false);
      },
    });
  };

  const getStepClass = (currentStep: number) => {
    if (currentStep === step)
      return "opacity-100 translate-x-0 pointer-events-auto";
    return direction === "forward"
      ? "opacity-0 scale-50 pointer-events-none"
      : "opacity-0 scale-50 pointer-events-none";
  };

  return isLoading ? (
    <LoadingIndicator />
  ) : (
    <div className="flex flex-col items-center space-y-8  max-w-md mx-auto h-full">
      <div className="relative w-full h-full">
        <FancyStep
          className={getStepClass(1)}
          onHandleNextStep={handleNextStep}
          title="Hey I'm your AI Running Coach, I'll help you to build your plan"
          icon={<RobotIcon className="w-52 h-52" />}
          showTitleCol={true}
        >
          <div></div>
        </FancyStep>

        <FancyStep
          className={getStepClass(2)}
          onHandleNextStep={handleNextStep}
          onHandlePreviousStep={handlePreviousStep}
          isNextButtonEnabled={goal.length > 0}
          title="What is your goal?"
          icon={<GoalIcon className="w-16 h-16" />}
          showTitleCol={true}
          isStepActive={step === 2}
        >
          <div className="p-4">
            <p className="text-gray-600 text-center">
              Example: "I want to run 10k under 50 minutes"
            </p>
            <Input
              className="mt-4 border-indigo-600"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Type your goal..."
            />
          </div>
        </FancyStep>

        <FancyStep
          className={getStepClass(3)}
          onHandleNextStep={handleNextStep}
          onHandlePreviousStep={handlePreviousStep}
          title="Is there any time restriction to achive the goal?"
          icon={<SandClock className="w-36 h-36" />}
          showTitleCol={true}
        >
          <RadioGroupComponent
            value={timeRestriction}
            onChange={setTimeRestriction}
            options={[
              "1 month",
              "2 month",
              "3 months",
              "4 months",
              "No time restriction",
            ]}
          />
        </FancyStep>

        <FancyStep
          className={getStepClass(4)}
          onHandleNextStep={handleNextStep}
          onHandlePreviousStep={handlePreviousStep}
          title="How many days can you train per week?"
          icon={<CalendarIcon className="w-12 h-12" />}
          showTitleCol={true}
        >
          <RadioGroupComponent
            value={frequency}
            onChange={setFrequency}
            options={["3", "4", "5", "6", "7"]}
          />
        </FancyStep>

        <FancyStep
          className={getStepClass(5)}
          onHandleNextStep={handleSubmit}
          onHandlePreviousStep={handlePreviousStep}
          title="What is your running level?"
          icon={<LevelsIcon className="w-36 h-36" />}
          showTitleCol={true}
        >
          <RadioGroupComponent
            value={level}
            onChange={setLevel}
            options={["Beginner", "Intermediate", "Advanced"]}
          />
        </FancyStep>

        {plan && (
          <FancyStep
            className={getStepClass(6)}
            onHandleNextStep={handleSubmit}
          >
            <Plan plan={plan} />
          </FancyStep>
        )}
      </div>
    </div>
  );
};

export default TrainingWorkflow;
