import { ChangeEventHandler } from "react";
import { Input } from "../ui/input";

type Props = {
  id: string;
  name: string;
  type?: string;
  label: string;
  value: any;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
};

export default function InputField({
  id,
  name,
  type,
  label,
  value,
  onChange,
  placeholder,
}: Props) {
  return (
    <div className="text-md text-gray-700">
      <label htmlFor={name} className="font-bold block mb-2">
        {label}
      </label>
      <Input
        className="text-xl"
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
