
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', icon, ...props }) => {
  const baseClasses = 'px-6 py-2.5 rounded-md font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-green-600 hover:bg-green-700 shadow-[0_0_10px_rgba(16,185,129,0.7)] hover:shadow-[0_0_15px_rgba(16,185,129,1)]',
    secondary: 'bg-gray-700 hover:bg-gray-600 border border-gray-500 hover:border-green-500',
    danger: 'bg-red-600 hover:bg-red-700 shadow-[0_0_10px_rgba(220,38,38,0.7)] hover:shadow-[0_0_15px_rgba(220,38,38,1)]',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`} {...props}>
      {icon}
      {children}
    </button>
  );
};

export default Button;
