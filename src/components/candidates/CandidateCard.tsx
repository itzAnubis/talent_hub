import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Star, FileText, MessageSquare, ChevronRight } from 'lucide-react';
import StatusBadge from './StatusBadge';

interface CandidateCardProps {
  candidate: any;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  // Helper to generate star rating
  const renderStarRating = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
              {candidate.name.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{candidate.name}</h3>
              <p className="text-sm text-gray-600">{candidate.position}</p>
            </div>
          </div>
          <StatusBadge status={candidate.status} />
        </div>

        <div className="mt-4 text-sm text-gray-500 grid grid-cols-2 gap-2">
          <div>Department:</div>
          <div className="text-gray-700">{candidate.department}</div>
          
          <div>Applied:</div>
          <div className="text-gray-700">{candidate.appliedDate}</div>
          
          <div>Experience:</div>
          <div className="text-gray-700">{candidate.experienceLevel}</div>
          
          <div>Location:</div>
          <div className="text-gray-700">{candidate.location}</div>


          <div>ATS Score:</div>
          <div className="text-gray-700">{candidate.atsScore}%</div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {candidate.skills.slice(0, 3).map((skill: string, index: number) => (
            <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs">
              {skill}
            </span>
          ))}
          {candidate.skills.length > 3 && (
            <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded-md text-xs">
              +{candidate.skills.length - 3} more
            </span>
          )}
        </div>

        <div className="mt-4 pt-4 border-t flex items-center justify-between">
          <div className="flex items-center gap-1">
            {renderStarRating(candidate.rating)}
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50" title="Send Email">
              <Mail className="h-4 w-4" />
            </button>
            <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50" title="View CV">
              <FileText className="h-4 w-4" />
            </button>
            <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50" title="Message">
              <MessageSquare className="h-4 w-4" />
            </button>
            <Link 
              to={`/dashboard/candidates/${candidate.id}`} 
              className="p-1.5 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50"
              title="View Profile"
            >
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;