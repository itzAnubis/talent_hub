import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  isDecreasePositive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, isDecreasePositive = false }) => {
  const isPositive = isDecreasePositive ? change < 0 : change > 0;
  const isNeutral = change === 0;

  return (
    <div className="bg-white rounded-lg shadow p-6 transition-transform hover:translate-y-[-3px]">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-bold mt-1 mb-2">{value}</p>
        </div>
        {icon}
      </div>
      
      <div className={`inline-flex items-center text-sm font-medium ${
        isNeutral 
          ? 'text-gray-500' 
          : isPositive 
            ? 'text-green-600' 
            : 'text-red-600'
      }`}>
        {!isNeutral && (
          <>
            {isPositive ? (
              <ArrowUpRight className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 mr-1" />
            )}
          </>
        )}
        {change > 0 ? '+' : ''}{change}% from last month
      </div>
    </div>
  );
};

export default StatCard;