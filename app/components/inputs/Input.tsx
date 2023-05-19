'use client';

import clsx from 'clsx';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

function Input({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}: InputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="
        block 
        text-sm
        font-medium
        leading-6
        text-gray-900
        mb-2
        "
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        disabled={disabled}
        {...register(id, { required })}
        className={clsx(
          `w-full appearance-none border rounded shadow py-2 px-3 text-gray-900 focus:outline-blue-400 focus:shadow-outline`,
          errors[id] && 'focus:ring-rose-400',
          disabled && 'opacity-50 cursor-default'
        )}
      />
    </div>
  );
}

export default Input;
