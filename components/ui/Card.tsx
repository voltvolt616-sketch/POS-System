
import React from 'react';

interface CardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color?: string;
}

const Card: React.FC<CardProps> = ({ title, value, icon, color = 'green' }) => {
  const colorClasses = {
    green: 'border-green-500 text-green-400',
    blue: 'border-blue-500 text-blue-400',
    yellow: 'border-yellow-500 text-yellow-400',
  };

  const shadowClasses = {
      green: 'shadow-[0_0_15px_rgba(16,185,129,0.5)]',
      blue: 'shadow-[0_0_15px_rgba(59,130,246,0.5)]',
      yellow: 'shadow-[0_0_15px_rgba(234,179,8,0.5)]',
  }

  return (
    <div className={`bg-gray-900 border-t-4 ${colorClasses[color]} p-6 rounded-lg shadow-lg transition-all duration-300 hover:bg-gray-800 hover:scale-105 ${shadowClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-white neon-text">{value}</p>
        </div>
        <div className={`text-5xl ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Card;
