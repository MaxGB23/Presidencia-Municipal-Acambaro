import React from 'react';

interface CheckboxProps {
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label }) => (
  <label className="flex items-center gap-2 lg:gap-3 lg:text-lg">
    <input
      type="checkbox"
      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
    />
    {label}
  </label>
);

export default Checkbox;
