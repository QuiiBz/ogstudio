import type { ReactNode } from "react";
import { useId } from "react";

interface SelectProps {
  value: string;
  values: string[];
  onChange: (value: string) => void;
  children: ReactNode;
}

export function Select({ value, values, onChange, children }: SelectProps) {
  const id = useId();

  return (
    <div className="border border-gray-100 rounded pl-1.5 bg-gray-100 flex items-center gap-1 hover:border-gray-300">
      <label className="text-gray-700 text-sm whitespace-nowrap" htmlFor={id}>
        {children}
      </label>
      <select
        className="px-1 py-0.5 text-gray-900 rounded w-full h-full focus:outline-blue-500"
        defaultValue={value}
        id={id}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      >
        {values.map((currentValue) => (
          <option key={currentValue} value={currentValue}>
            {currentValue}
          </option>
        ))}
      </select>
    </div>
  );
}
