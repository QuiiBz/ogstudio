import { ReactNode, useId } from "react"

type InputType = 'text' | 'color' | 'number' | 'textarea'
type InputTypeToValue<Type extends InputType> = Type extends 'number' ? number : string

type InputProps<Type extends InputType> = {
  type: Type
  value: InputTypeToValue<Type>
  min?: number
  max?: number
  suffix?: string
  onChange: (value: InputTypeToValue<Type>) => void
  className?: string
  children?: ReactNode
}

export function Input<Type extends InputType>({ type, value, min, max, suffix, onChange, className, children }: InputProps<Type>) {
  const id = useId()
  const Tag = type === 'textarea' ? 'textarea' : 'input'

  return (
    <div className={`border border-gray-200 rounded bg-gray-50 flex items-center gap-1 hover:border-gray-300 relative ${children ? 'pl-1.5' : ''} ${className}`}>
      {children ? (
        <label htmlFor={id} className="text-gray-700 text-sm whitespace-nowrap">
          {children}
        </label>
      ) : null}
      <Tag
        id={id}
        className="px-1 py-0.5 text-gray-900 rounded w-full focus:outline-blue-500"
        type={type}
        min={min}
        max={max}
        value={value}
        onKeyUp={event => {
          if (event.key === 'Enter' || event.key === 'Escape') {
            event.preventDefault()
            event.currentTarget.blur()
          }
        }}
        onChange={event => {
          const value = event.target.value

          if (type === 'number') {
            const valueNumber = Number(value)

            if (min !== undefined && valueNumber < min || max !== undefined && valueNumber > max) {
              return
            }
          }

          // @ts-expect-error wtf?
          onChange(value)
        }}
      />
      {suffix ? (
        <span className="absolute right-2 text-xs text-gray-400">
          {suffix}
        </span>
      ) : null}
    </div>
  )
}

type SelectProps = {
  value: string
  values: string[]
  onChange: (value: string) => void
  children: ReactNode
}

export function Select({ value, values, onChange, children }: SelectProps) {
  const id = useId()

  return (
    <div className="border border-gray-100 rounded pl-1.5 bg-gray-100 flex items-center gap-1 hover:border-gray-300">
      <label htmlFor={id} className="text-gray-700 text-sm whitespace-nowrap">
        {children}
      </label>
      <select
        id={id}
        className="px-1 py-0.5 text-gray-900 rounded w-full h-full focus:outline-blue-500"
        defaultValue={value}
        onChange={event => onChange(event.target.value)}
      >
        {values.map(currentValue => (
          <option value={currentValue} key={currentValue}>{currentValue}</option>
        ))}
      </select>
    </div>
  )
}
