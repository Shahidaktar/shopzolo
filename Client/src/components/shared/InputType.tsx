import { ChangeEvent } from "react";

interface InputTypeProps {
  id: string;
  name: string;
  type: string;
  required?: boolean | undefined;
  label: string;
  labelFor: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  placeholder?: string;
}

const InputType = ({
  id,
  name,
  type,
  required,
  label,
  labelFor,
  onChange,
  value,
  autoComplete,
  placeholder,
}: InputTypeProps) => {
  return (
    <>
      <div className="mt-2">
        <label
          className="block text-sm font-medium leading-6 text-gray-900"
          htmlFor={labelFor}
        >
          {label}
        </label>
        <div className="mt-2">
          <input
            id={id}
            placeholder={placeholder}
            name={name}
            type={type}
            value={value}
            required={required}
            onChange={onChange}
            autoComplete={autoComplete}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </>
  );
};

export default InputType;
