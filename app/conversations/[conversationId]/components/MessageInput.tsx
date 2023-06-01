'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface MessageInputProps {
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

const MessageInput: React.FC<MessageInputProps> = ({
  id,
  type,
  placeholder,
  required,
  register,
  errors,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        {...register(id, { required })}
        placeholder={placeholder}
        className="
        w-full
        rounded-full
        text-black
        font-light
        px-4
        py-2
        bg-neutral-100
        focus:outline-none
        "
      />
    </div>
  );
};

export default MessageInput;
