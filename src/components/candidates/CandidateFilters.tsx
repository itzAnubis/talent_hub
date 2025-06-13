import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface CandidateFiltersProps {
  activeFilters: {
    status: string[];
    department: string[];
    skills: string[];
    experience: string[];
    atsScoreRange: number[];
  };
  onFilterChange: (filterType: string, values: string[] | number[]) => void;
  onClearFilters: () => void;
}

const CandidateFilters: React.FC<CandidateFiltersProps> = ({ 
  activeFilters, 
  onFilterChange,
  onClearFilters
}) => {
  const statuses = [
    'New', 'Screening', 'Interviewing', 'Assessment', 'Offered', 'Hired', 'Rejected', 'On Hold'
  ];
  
  const departments = [
    'Engineering', 'Product', 'Marketing', 'Sales', 'Customer Success', 'HR', 'Finance', 'Operations'
  ];
  
  const skills = [
    'JavaScript', 'React', 'Python', 'Java', 'SQL', 'DevOps', 'UX/UI Design', 'Project Management',
    'Marketing', 'Sales', 'Customer Service', 'Communication', 'Leadership', 'Data Analysis'
  ];
  
  const experienceLevels = [
    'Entry Level', 'Mid Level', 'Senior', 'Manager', 'Director', 'Executive'
  ];

  const handleFilterToggle = (type: string, value: string) => {
    const currentValues = [...activeFilters[type as keyof typeof activeFilters]];
    const valueIndex = currentValues.indexOf(value);
    
    if (valueIndex === -1) {
      // Add value
      onFilterChange(type, [...currentValues, value] as string[] | number[]);
    } else {
      // Remove value
      currentValues.splice(valueIndex, 1);
      onFilterChange(type, currentValues as string[] | number[]);
    }
  };

  const handleAtsScoreChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newRange = [...activeFilters.atsScoreRange];
    const value = Math.min(Math.max(Number(e.target.value), 0), 100); // Ensure value is between 0 and 100
    newRange[index] = value;
    if (index === 0 && value > newRange[1]) newRange[1] = value; // Ensure min <= max
    if (index === 1 && value < newRange[0]) newRange[0] = value; // Ensure max >= min
    onFilterChange('atsScoreRange', newRange);
  };

  // Dual-range slider logic
  const [isDraggingMin, setIsDraggingMin] = useState(false);
  const [isDraggingMax, setIsDraggingMax] = useState(false);

  const handleMouseDown = (index: number) => {
    if (index === 0) setIsDraggingMin(true);
    else setIsDraggingMax(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingMin && !isDraggingMax) return;

    const slider = e.currentTarget;
    const rect = slider.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    let value = Math.round((x / width) * 100);

    if (isDraggingMin) {
      value = Math.min(Math.max(value, 0), activeFilters.atsScoreRange[1] - 1); // Prevent crossing max
      onFilterChange('atsScoreRange', [value, activeFilters.atsScoreRange[1]]);
    } else if (isDraggingMax) {
      value = Math.max(Math.min(value, 100), activeFilters.atsScoreRange[0] + 1); // Prevent crossing min
      onFilterChange('atsScoreRange', [activeFilters.atsScoreRange[0], value]);
    }
  };

  const handleMouseUp = () => {
    setIsDraggingMin(false);
    setIsDraggingMax(false);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <div className="bg-gray-50 p-6 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Filter Candidates</h3>
        
        <button 
          onClick={onClearFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Clear All Filters
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Status filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Status</h4>
          <div className="space-y-2">
            {statuses.map(status => (
              <div key={status} className="flex items-center">
                <input 
                  type="checkbox" 
                  id={`status-${status}`}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={activeFilters.status.includes(status)}
                  onChange={() => handleFilterToggle('status', status)}
                />
                <label htmlFor={`status-${status}`} className="ml-2 text-sm text-gray-700">
                  {status}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Department filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Department</h4>
          <div className="space-y-2">
            {departments.map(department => (
              <div key={department} className="flex items-center">
                <input 
                  type="checkbox" 
                  id={`dept-${department}`}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={activeFilters.department.includes(department)}
                  onChange={() => handleFilterToggle('department', department)}
                />
                <label htmlFor={`dept-${department}`} className="ml-2 text-sm text-gray-700">
                  {department}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Skills filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Skills</h4>
          <div className="space-y-2">
            {skills.map(skill => (
              <div key={skill} className="flex items-center">
                <input 
                  type="checkbox" 
                  id={`skill-${skill}`}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={activeFilters.skills.includes(skill)}
                  onChange={() => handleFilterToggle('skills', skill)}
                />
                <label htmlFor={`skill-${skill}`} className="ml-2 text-sm text-gray-700">
                  {skill}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Experience filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Experience Level</h4>
          <div className="space-y-2">
            {experienceLevels.map(level => (
              <div key={level} className="flex items-center">
                <input 
                  type="checkbox" 
                  id={`exp-${level}`}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={activeFilters.experience.includes(level)}
                  onChange={() => handleFilterToggle('experience', level)}
                />
                <label htmlFor={`exp-${level}`} className="ml-2 text-sm text-gray-700">
                  {level}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* ATS Score filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">ATS Score Range</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="number"
                min="0"
                max="100"
                value={activeFilters.atsScoreRange[0]}
                onChange={(e) => handleAtsScoreChange(e, 0)}
                className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                min="0"
                max="100"
                value={activeFilters.atsScoreRange[1]}
                onChange={(e) => handleAtsScoreChange(e, 1)}
                className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div
              className="relative w-full h-2 bg-gray-200 rounded-lg"
              onMouseMove={handleMouseMove}
              onMouseDown={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const value = Math.round((x / rect.width) * 100);
                if (Math.abs(value - activeFilters.atsScoreRange[0]) < Math.abs(value - activeFilters.atsScoreRange[1])) {
                  handleMouseDown(0);
                } else {
                  handleMouseDown(1);
                }
              }}
            >
              <div
                className="absolute h-4 w-4 bg-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${(activeFilters.atsScoreRange[0] / 100) * 100}%` }}
                onMouseDown={() => handleMouseDown(0)}
              ></div>
              <div
                className="absolute h-4 w-4 bg-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${(activeFilters.atsScoreRange[1] / 100) * 100}%` }}
                onMouseDown={() => handleMouseDown(1)}
              ></div>
              <div
                className="absolute h-2 bg-blue-500 rounded-l-lg"
                style={{ left: `${(activeFilters.atsScoreRange[0] / 100) * 100}%`, width: `${(activeFilters.atsScoreRange[1] - activeFilters.atsScoreRange[0]) / 100 * 100}%`, background: 'blue' }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Active filters */}
      {Object.values(activeFilters).some(filter => filter.length > 0 || (Array.isArray(filter) && (filter[0] !== 0 || filter[1] !== 100))) && (
        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-700">Active filters:</span>
            
            {Object.entries(activeFilters).flatMap(([type, values]) => {
              if (type === 'atsScoreRange' && (values[0] !== 0 || values[1] !== 100)) {
                return [
                  <span key="atsScoreRange" className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs">
                    ATS Score: {values[0]}% - {values[1]}%
                    <button 
                      onClick={() => onFilterChange('atsScoreRange', [0, 100])}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ];
              }
              return values.map((value, index) => (
                <span key={`${type}-${index}`} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs">
                  {value}
                  <button 
                    onClick={() => handleFilterToggle(type, value.toString())}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ));
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateFilters;