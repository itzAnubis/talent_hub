import React from 'react';
import { useData } from '../../contexts/DataContext';

const DepartmentMetrics: React.FC = () => {
  const { departmentMetrics } = useData();
  
  // Sort departments by the number of open positions (descending)
  const sortedDepartments = [...departmentMetrics].sort(
    (a, b) => b.openPositions - a.openPositions
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Department
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Open Positions
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Active Candidates
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Interviews
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time to Hire
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fill Rate
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedDepartments.map((department) => (
            <tr key={department.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${department.color} mr-3`}></div>
                  <div className="text-sm font-medium text-gray-800">{department.name}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                <span className="px-2 py-1 rounded-md bg-blue-50 text-blue-600">{department.openPositions}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700">
                {department.activeCandidates}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700">
                {department.interviews}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700">
                {department.timeToHire} days
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="flex items-center justify-center">
                  <span className={`text-sm font-medium ${
                    department.fillRate >= 70 ? 'text-green-600' :
                    department.fillRate >= 40 ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    {department.fillRate}%
                  </span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full ml-2">
                    <div 
                      className={`h-2 rounded-full ${
                        department.fillRate >= 70 ? 'bg-green-500' :
                        department.fillRate >= 40 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${department.fillRate}%` }}
                    ></div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentMetrics;