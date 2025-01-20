import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type RadioGroupProps = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  className?: string;
};

function RadioGroupComponent({
  value,
  onChange,
  options,
  className,
}: RadioGroupProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={(value) => onChange(value)}
      className={`space-y-2 ${className}`}
    >
      {options.map((option) => (
        <div
          key={option}
          className="flex items-center space-x-2 bg-indigo-100 p-2 rounded"
        >
          <RadioGroupItem value={option.toLowerCase()} id={`item-${option}`} />
          <label htmlFor={`item-${option}`} className="text-md font-semibold">
            {option}
          </label>
        </div>
      ))}
    </RadioGroup>
  );
}

export default RadioGroupComponent;
