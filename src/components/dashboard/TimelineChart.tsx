import React from 'react';
import { useData } from '../../contexts/DataContext';

const TimelineChart: React.FC = () => {
  const { timelineData } = useData();
  
  // Find the highest value for scaling
  const maxValue = Math.max(...timelineData.flatMap(month => [month.applications, month.interviews, month.offers, month.hires]));
  
  // Function to calculate bar height percentage
  const calculateHeight = (value) => {
    return `${(value / maxValue) * 100}%`;
  };

  return (
    <div className="h-[300px]">
      <div className="flex items-end h-[250px] gap-4 overflow-x-auto">
        {timelineData.map((month, index) => (
          <div key={index} className="flex-shrink-0 min-w-[80px] flex flex-col items-center">
            <div className="w-full h-[200px] flex justify-between items-end relative gap-1">
              <div 
                className="w-[20%] bg-blue-500 rounded-t-sm relative group"
                style={{ height: calculateHeight(month.applications) }}
              >
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded transition-opacity">
                  {month.applications}
                </div>
              </div>
              <div 
                className="w-[20%] bg-purple-500 rounded-t-sm relative group"
                style={{ height: calculateHeight(month.interviews) }}
              >
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded transition-opacity">
                  {month.interviews}
                </div>
              </div>
              <div 
                className="w-[20%] bg-amber-500 rounded-t-sm relative group"
                style={{ height: calculateHeight(month.offers) }}
              >
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded transition-opacity">
                  {month.offers}
                </div>
              </div>
              <div 
                className="w-[20%] bg-green-500 rounded-t-sm relative group"
                style={{ height: calculateHeight(month.hires) }}
              >
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded transition-opacity">
                  {month.hires}
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-600 mt-2">{month.month}</div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-4 space-x-4">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-blue-500 rounded-sm mr-1"></span>
          <span className="text-xs text-gray-600">Applications</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-purple-500 rounded-sm mr-1"></span>
          <span className="text-xs text-gray-600">Interviews</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-amber-500 rounded-sm mr-1"></span>
          <span className="text-xs text-gray-600">Offers</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-green-500 rounded-sm mr-1"></span>
          <span className="text-xs text-gray-600">Hires</span>
        </div>
      </div>
    </div>
  );
};

export default TimelineChart;