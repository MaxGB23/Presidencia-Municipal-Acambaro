import { Asterisk } from "lucide-react";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error = "", id, required, ...props }, ref) => {
    return (
      <div className="relative">
        <div className="flex items-center mb-2">
          <label htmlFor={id} className="pl-1 block text-sm lg:text-lg text-gray-800">
            {label}
          </label>
          {required && <Asterisk className='text-red-600 size-3 ml-1'></Asterisk>}
        </div>

        <input
          id={id}
          ref={ref} // Pasamos la referencia aquí
          className="bg-white w-full p-4 text-base lg:text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring input-autocomplete-dark dark:text-black"
          {...props} // Pasamos todas las props restantes (type, placeholder, etc.)
        /> <br />
        {error && <span className="text-red-600 pl-1 pt-1 absolute">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input"; // Esto es necesario para evitar errores con forwardRef

export default Input;
