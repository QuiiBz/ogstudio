import type { ReactNode } from "react";
import { useId } from "react";
import { clsx } from "clsx";

type InputType = "text" | "color" | "number" | "textarea";
type InputTypeToValue<Type extends InputType> = Type extends "number"
  ? number
  : string;

interface InputProps<Type extends InputType> {
  type: Type;
  value: InputTypeToValue<Type>;
  min?: number;
  max?: number;
  suffix?: string;
  onChange: (value: InputTypeToValue<Type>) => void;
  trackArrowDirection?: boolean;
  onKeyDown?: (arrowDirection: "up" | "down") => void;
  className?: string;
  children?: ReactNode;
}

export function Input<Type extends InputType>({
  type,
  value,
  min,
  max,
  suffix,
  onChange,
  trackArrowDirection,
  onKeyDown,
  className,
  children,
}: InputProps<Type>) {
  const id = useId();
  const Tag = type === "textarea" ? "textarea" : "input";

  return (
    <div
      className={clsx(
        "border border-gray-200 rounded bg-gray-50 flex items-center gap-1 hover:border-gray-300 relative",
        { "pl-1.5": children },
        className,
      )}
    >
      {children ? (
        <label className="text-gray-700 text-sm whitespace-nowrap" htmlFor={id}>
          {children}
        </label>
      ) : null}
      <Tag
        className="px-1 py-0.5 text-gray-900 rounded w-full focus:outline-blue-500"
        id={id}
        max={max}
        min={min}
        onChange={(event) => {
          const eventValue = event.target.value;

          if (type === "number") {
            const valueNumber = Number(eventValue);

            // if (!eventValue) return;

            if (
              (min !== undefined && valueNumber < min) ||
              (max !== undefined && valueNumber > max)
            ) {
              return;
            }

            // @ts-expect-error wtf?
            onChange(valueNumber);
            return;
          }

          // @ts-expect-error wtf?
          onChange(eventValue);
        }}
        onKeyDown={(event) => {
          if (trackArrowDirection && type === "text" && onKeyDown) {
            if (event.key === "ArrowDown") onKeyDown("down");
            if (event.key === "ArrowUp") onKeyDown("up");
          }
        }}
        onKeyUp={(event) => {
          if (event.key === "Enter" || event.key === "Escape") {
            event.preventDefault();
            event.currentTarget.blur();
          }
        }}
        type={type}
        value={value}
      />
      {suffix ? (
        <span className="absolute right-2 text-xs text-gray-400">{suffix}</span>
      ) : null}
    </div>
  );
}
