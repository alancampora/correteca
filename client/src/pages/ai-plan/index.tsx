import { ReactNode, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type StepProps = {
  children: ReactNode; className: string
}

function Step({ children, className }: StepProps) {
  return (
    <div className={`${className} absolute w-full transition-transform transition-opacity duration-500 ease-in-out transform bg-gray-50 rounded-lg shadow p-4`}>

      {children}
    </div>
  )
}

const TrainingWorkflow: React.FC = () => {
  const [step, setStep] = useState(1); // Tracks the current step
  const [goal, setGoal] = useState(""); // User's goal
  const [frequency, setFrequency] = useState("3"); // Training frequency
  const [level, setLevel] = useState(""); // Running level
  const [direction, setDirection] = useState<"forward" | "backward">("forward"); // Animation direction

  const handleNextStep = () => {
    if (step < 3) {
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
    if (currentStep === step) return "opacity-100 translate-x-0 pointer-events-auto";
    return direction === "forward"
      ? "opacity-0 scale-50 pointer-events-none"
      : "opacity-0 scale-50 pointer-events-none";
  };

  return (
    <div className="flex flex-col items-center space-y-8 p-8 max-w-md mx-auto">
      <div className="relative w-full">

        <Step className={getStepClass(1)}>
          <div className="space-y-4 text-center">
            <h2 className="text-xl font-semibold">What is your goal?</h2>
            <p className="text-gray-600">Example: "I want to run 10k under 50 minutes"</p>
            <Input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Type your goal..."
            />
            <Button
              onClick={handleNextStep}
              disabled={!goal.trim()}
              className="mt-4 w-full"
            >
              Next
            </Button>
          </div>
        </Step>

        <Step className={getStepClass(2)}>
          <div className="space-y-4 text-center">
            <h2 className="text-xl font-semibold">How many days can you train per week?</h2>
            <RadioGroup
              value={frequency}
              onValueChange={(value) => setFrequency(value)}
              className="space-y-2"
            >
              {[3, 4, 5, 6, 7].map((days) => (
                <div key={days} className="flex items-center space-x-2">
                  <RadioGroupItem value={days.toString()} id={`frequency-${days}`} />
                  <label htmlFor={`frequency-${days}`} className="text-sm">
                    {days} days
                  </label>
                </div>
              ))}
            </RadioGroup>
            <div className="flex justify-between w-full">
              <Button onClick={handlePreviousStep} variant="outline">
                Back
              </Button>
              <Button
                onClick={handleNextStep}
                className="w-full"
              >
                Next
              </Button>
            </div>
          </div>
        </Step>

        <Step className={getStepClass(3)}>
          <div className="space-y-4 text-center">
            <h2 className="text-xl font-semibold">What is your running level?</h2>
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
            <div className="flex justify-between w-full">
              <Button onClick={handlePreviousStep} variant="outline">
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!level}
                className="w-full"
              >
                Submit
              </Button>
            </div>
          </div>
        </Step>

      </div>
    </div>
  );
};

export default TrainingWorkflow;
