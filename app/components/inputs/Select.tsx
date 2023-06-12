'use client';

import ReactSelect from 'react-select';

interface SelectProps {
  label: string;
  onChange: (value: Record<string, any>) => void;
  options: Record<string, any>[];
  value?: Record<string, any>;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  onChange,
  options,
  value,
  disabled,
}) => {
  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          value={value}
          options={options}
          isMulti
          menuPortalTarget={document.body}
          onChange={onChange}
          isDisabled={disabled}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          classNames={{
            control: () => 'text-sm',
          }}
        />
      </div>
    </div>
  );
};

export default Select;
