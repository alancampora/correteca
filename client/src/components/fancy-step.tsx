import { ReactNode } from "react";
import { Button } from "./ui/button";
import AnimatedText from "./animated-text";

type StepProps = {
  children: ReactNode;
  className: string;
  title: string; // Step title
  icon: React.ReactNode; // Icon component
  showTitleCol?: boolean;
  onHandlePreviousStep?: () => void;
  onHandleNextStep: () => void;
  isStepActive?: boolean;
};

export default function FancyStep({
  title,
  icon,
  showTitleCol,
  children,
  className,
  isStepActive,
  onHandlePreviousStep,
  onHandleNextStep,
}: StepProps) {
  return (
    <div
      className={`${className} 
        p-4 absolute w-full h-full transition-transform transition-opacity duration-500 ease-in-out transform`}
    >
      <div className="">
        <div className="flex justify-between w-full space-x-2 mb-6">
          {onHandlePreviousStep && (
            <Button
              className=""
              onClick={onHandlePreviousStep}
              variant="outline"
            >
              Back
            </Button>
          )}
          <Button onClick={onHandleNextStep} className="bg-indigo-600 w-full">
            Next
          </Button>
        </div>

        <div
          className={`flex items-center space-y-4 ${showTitleCol ? "flex-col" : "flex-row"}`}
        >
          <AnimatedText
            className="text-4xl font-semibold text-center"
            text={title}
            trigger={isStepActive}
          />
          {icon}
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
