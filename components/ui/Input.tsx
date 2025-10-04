
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-green-400 mb-2">{label}</label>
      <input
        className="w-full bg-gray-800 border border-gray-600 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
        {...props}
      />
    </div>
  );
};

export default Input;
