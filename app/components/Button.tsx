'use client';

import clsx from 'clsx';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset' | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

function Button({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        `flex justify-center rounded-md py-2 px-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`,
        disabled && 'opacity-50 cursor-default',
        fullWidth && 'w-full',
        secondary ? 'text-gray-500' : 'text-white',
        danger &&
        'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
        !secondary &&
        !danger &&
        'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600'
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
