
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ label, children, ...props }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-green-400 mb-2">{label}</label>
      <select
        className="w-full bg-gray-800 border border-gray-600 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all appearance-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'left 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
