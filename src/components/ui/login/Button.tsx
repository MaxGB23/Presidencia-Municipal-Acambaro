import React from 'react';

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, className = '', onClick }) => (
  <button
    className={`w-full py-4 text-white btn-login pri-ter rounded-full transition text-lg lg:text-xl ${className}`}
    onClick={onClick}
  >
    {text}
  </button>
);

export default Button;
