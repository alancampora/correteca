import { ReactNode, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import GoalIcon from "@/components/icons/goal";
import CalendarIcon from "@/components/icons/calendar";
import RobotIcon from "@/components/icons/robot";
import FancyStep from "@/components/fancy-step";
import LevelsIcon from "@/components/icons/levels";

type StepProps = {
  children: ReactNode;
  className: string;
  title: string; // Step title
  icon: React.ReactNode; // Icon component
  showTitleCol?: boolean;
  onHandlePreviousStep?: () => void;
  onHandleNextStep: () => void;
};

function Step({
  title,
  icon,
  children,
  className,
  onHandlePreviousStep,
  onHandleNextStep,
}: StepProps) {
  return (
    <div
      className={`${className} p-4 bg-black absolute w-full transition-transform transition-opacity duration-500 ease-in-out transform bg-gray-50 p-4`}
    >
      <div className="flex items-center flex-row space-x-2">
        {icon}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="space-y-4 text-center mt-4">{children}</div>
      <div className="flex justify-between w-full space-x-2 mt-4">
        <Button onClick={onHandlePreviousStep} variant="outline">
          Back
        </Button>
        <Button onClick={onHandleNextStep} className="w-full">
          Next
        </Button>
      </div>
    </div>
  );
}



const TrainingWorkflow: React.FC = () => {
  const [step, setStep] = useState(1); // Tracks the current step
  const [goal, setGoal] = useState(""); // User's goal
  const [frequency, setFrequency] = useState("3"); // Training frequency
  const [level, setLevel] = useState(""); // Running level
  const [direction, setDirection] = useState<"forward" | "backward">("forward"); // Animation direction

  const handleNextStep = () => {
    if (step < 4) {
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

  const handleSubmit = () => {
    console.log({
      goal,
      frequency,
      level,
    });
    alert("Generating your training plan!");
  };

  const getStepClass = (currentStep: number) => {
    if (currentStep === step)
      return "opacity-100 translate-x-0 pointer-events-auto";
    return direction === "forward"
      ? "opacity-0 scale-50 pointer-events-none"
      : "opacity-0 scale-50 pointer-events-none";
  };

  return (
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
          title="How many days can you train per week?"
          icon={<CalendarIcon className="w-12 h-12" />}
          showTitleCol={true}
        >
          <RadioGroup
            value={frequency}
            onValueChange={(value) => setFrequency(value)}
            className="space-y-2"
          >
            {[3, 4, 5, 6, 7].map((days) => (
              <div key={days} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={days.toString()}
                  id={`frequency-${days}`}
                />
                <label htmlFor={`frequency-${days}`} className="text-sm">
                  {days} days
                </label>
              </div>
            ))}
          </RadioGroup>
        </FancyStep>

        <FancyStep
          className={getStepClass(4)}
          onHandleNextStep={handleSubmit}
          onHandlePreviousStep={handlePreviousStep}
          title="What is your running level?"
          icon={<LevelsIcon className="w-36 h-36" />}
          showTitleCol={true}
        >
          <RadioGroup
            value={level}
            onValueChange={(value) => setLevel(value)}
            className="space-y-2"
          >
            {["Beginner", "Intermediate", "Advanced"].map((lvl) => (
              <div key={lvl} className="flex items-center space-x-2">
                <RadioGroupItem value={lvl.toLowerCase()} id={`level-${lvl}`} />
                <label htmlFor={`level-${lvl}`} className="text-sm">
                  {lvl}
                </label>
              </div>
            ))}
          </RadioGroup>
        </FancyStep>
      </div>
    </div>
  );
};

export default TrainingWorkflow;
