import React from 'react';
import { useData } from '../../contexts/DataContext';

const RecruitmentFunnel: React.FC = () => {
  const { funnelData } = useData();

  // Find the maximum count to calculate percentages
  const maxCount = Math.max(...funnelData.map(stage => stage.count));
  
  // Calculate stage widths as percentages of the maximum
  const stageWidths = funnelData.map(stage => ({
    ...stage,
    width: `${Math.max((stage.count / maxCount) * 100, 25)}%`, // Minimum width of 25%
  }));

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        {stageWidths.map((stage, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700">{stage.name}</span>
              <span className="text-gray-500">{stage.count}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-8 overflow-hidden">
              <div 
                className={`h-8 flex items-center justify-start pl-3 text-xs font-medium text-white rounded-full ${stage.color}`}
                style={{ width: stage.width }}
              >
                {parseInt(stage.width) > 30 ? `${(stage.count / funnelData[0].count * 100).toFixed(1)}%` : ''}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Conversion Rates</h3>
        <div className="grid grid-cols-2 gap-2">
          {funnelData.slice(0, -1).map((stage, index) => {
            const nextStage = funnelData[index + 1];
            const conversionRate = ((nextStage.count / stage.count) * 100).toFixed(1);
            
            return (
              <div key={index} className="bg-gray-50 rounded-md p-2">
                <p className="text-xs text-gray-600 mb-1">
                  {stage.name} → {nextStage.name}
                </p>
                <p className={`text-sm font-semibold ${
                  parseFloat(conversionRate) > 40 ? 'text-green-600' : 
                  parseFloat(conversionRate) > 20 ? 'text-amber-600' : 'text-red-600'
                }`}>
                  {conversionRate}%
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecruitmentFunnel;