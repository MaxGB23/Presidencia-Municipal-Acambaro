import React from 'react';

interface InputProps {
  type: string;
  id: string;
  placeholder?: string;
  label: string;
}

const Input: React.FC<InputProps> = ({ type, id, placeholder = '', label }) => (
  <div>
    <label htmlFor={id} className="pl-1 block text-sm lg:text-lg text-gray-800 mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className="bg-white w-full p-4 text-base lg:text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
    />
  </div>
);

export default Input;
