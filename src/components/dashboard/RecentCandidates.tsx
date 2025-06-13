import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import StatusBadge from '../candidates/StatusBadge';
import { useData } from '../../contexts/DataContext';

const RecentCandidates: React.FC = () => {
  const { candidates } = useData();
  
  // Sort candidates by applied date and take the 5 most recent ones
  const recentCandidates = [...candidates]
    .sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime())
    .slice(0, 5);

  return (
    <div className="divide-y divide-gray-100">
      {recentCandidates.map((candidate) => (
        <div key={candidate.id} className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
              {candidate.name.split(' ').map(n => n[0]).join('')}
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800">{candidate.name}</h3>
              <div className="flex items-center text-sm text-gray-500 gap-2">
                <span>{candidate.position}</span>
                <span className="text-xs">•</span>
                <span>{candidate.department}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <StatusBadge status={candidate.status} />
            <Link 
              to={`/dashboard/candidates/${candidate.id}`} 
              className="p-1 text-gray-400 hover:text-blue-600 rounded-full hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      ))}
      
      <div className="p-4 text-center">
        <Link 
          to="/dashboard/candidates" 
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          View All Candidates
        </Link>
      </div>
    </div>
  );
};

export default RecentCandidates;