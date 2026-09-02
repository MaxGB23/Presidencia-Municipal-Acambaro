import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, className = '', onClick, disabled = false, loading = false }) => (
  <button
    className={`w-full py-4 text-white btn-login pri-ter rounded-full transition text-lg lg:text-xl inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    onClick={onClick}
    disabled={disabled || loading}
  >
    {loading && <Loader2 className="size-5 animate-spin" />}
    {text}
  </button>
);

export default Button;
